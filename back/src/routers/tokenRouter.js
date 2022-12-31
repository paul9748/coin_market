import { Router } from "express";
import { tokenService } from "../services/tokenService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tokenRouter = Router();

// 토큰갱신
tokenRouter.post("/token", async function (req, res, next) {
  try {
    //받아온 리프레쉬토큰
    const refreshToken = req.body.refreshToken;

    //받아온 리프레쉬토큰 jwt 복호화
    const secretKey = process.env.REFRESH_JWT_SECRET_KEY;
    const refreshJwtDecoded = jwt.verify(refreshToken, secretKey);

    //복호화해서 얻은 id로 해당 id db에 있는 리프레쉬토큰 불러옴
    const id = refreshJwtDecoded.id;

    const existedTokenDb = await tokenService.findToken(id);
    const existedRefreshToken = existedTokenDb.refreshToken;

    //받아온 리프레쉬토큰과 db에서 불러온 암호화된 리프레쉬 토큰이 동일한지 확인
    const isTokenRight = await bcrypt.compare(
      refreshToken,
      existedRefreshToken
    );

    //동일하지않다면 에러 (기존 리프레쉬 토큰이 만료되기 전까지 db와 달라도 통과)
    // Q. 애초에 암호화한 리프레쉬 토큰을 주고받는다면 어떨까??
    if (!isTokenRight) {
      throw new Error("전달한 토큰이 기존 토큰과 동일하지 않습니다.");
    }

    //동일하다면 계속 진행 -> 해당 id로 새로운 토큰 생성
    const userId = id;
    const newToken = await tokenService.createToken(userId);

    //새로 생성한 리프레쉬토큰 암호화
    const hashRefreshToken = bcrypt.hashSync(newToken.refresh_token, 12);

    //새로 생성해서 암호화한 토큰 db에 저장 (기존 db를 수정)
    const updateToken = await tokenService.updateToken(
      userId,
      hashRefreshToken
    );

    //새로 생성한 토큰 전달
    res.status(201).json(newToken);
  } catch (err) {
    next("refresh_token failed");
  }
});

export { tokenRouter };
