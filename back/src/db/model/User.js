import bcrypt from "bcrypt";
import { db } from "../db";
import { v4 } from "uuid";

class User {
  static async createUserByEmailAndPassword(data) {
    data.password = bcrypt.hashSync(data.password, 12);
    data.id = v4();
    const newUser = db.user.create({
      data,
    });
    return newUser;
  }

  static async findUserByEmail(email) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findUserById(id) {
    const user = db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
export { User };
