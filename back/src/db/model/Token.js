import { db } from "../db";
import { v4 } from "uuid";

class Token {
  static async createdTokenDb(data) {
    data.id = v4();
    const token = db.userToken.create({
      data,
    });
    return token;
  }

  static async findTokenById(userId) {
    const token = db.userToken.findUnique({
      where: {
        userId,
      },
    });
    return token;
  }

  static async updateToken(userId, refreshToken) {
    const updatedToken = db.userToken.update({
      where: {
        userId,
      },
      data: {
        refreshToken,
      },
    });
    return updatedToken;
  }

  static async deleteToken(userId) {
    const deletedToken = db.userToken.deleteToken({
      where: {
        userId,
      },
    });
    return deletedToken;
  }
}

export { Token };
