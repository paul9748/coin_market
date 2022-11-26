const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class userAuthService {
  static async findUserByEmail(email) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    user.id = v4();
    return db.user.create({
      data: user,
    });
  }

  static async findUserById(id) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
export { userAuthService };
