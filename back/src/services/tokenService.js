import { Token } from "../db/model/Token";
import jwt from "jsonwebtoken";

class tokenService {
  //토큰 생성
  static async createToken(userId) {
    const secretKey = process.env.JWT_SECRET_KEY;
    const access_token = jwt.sign({ id: userId }, secretKey, {
      expiresIn: "15m",
    });
    const refresh_token = jwt.sign(
      { id: userId },
      process.env.REFRESH_JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { access_token, refresh_token };
  }

  //토큰 db에 저장
  static async createdTokenDb(data) {
    const token = await Token.createdTokenDb(data);
    return token;
  }

  //토큰 확인
  static async findToken(userId) {
    const token = await Token.findTokenById(userId);
    return token;
  }

  //유저 확인
  static async findUser(refreshToken) {
    const data = await Token.findTokenByToken(refreshToken);
    return data.userId;
  }

  //토큰 갱신
  static async updateToken(userId, refreshToken) {
    const updatedToken = await Token.updateToken(userId, refreshToken);
    return updatedToken;
  }

  //토큰 삭제
  static async deleteToken(userId) {
    const deletedToken = await Token.deleteToken(userId);
    return deletedToken;
  }
}

export { tokenService };
