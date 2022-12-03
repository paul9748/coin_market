import { Router } from "express";
import { tokenService } from "../services/tokenService";
import { loginRequired } from "../middlewares/loginRequired";

const tokenRouter = Router();

// 토큰갱신
tokenRouter.post("/token", async function (req, res, next) {
  try {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    const userId = await tokenService.findUser(refreshToken);

    const newToken = await tokenService.createToken(userId);

    const updateToken = await tokenService.updateToken(
      userId,
      newToken.refresh_token
    );

    res.status(201).json(newToken);
  } catch (err) {
    next(err);
  }
});

export { tokenRouter };
