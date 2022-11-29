import { User } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  static async creatUser(data) {
    const email = data.email;

    const user = await User.findUserByEmail(email);
    if (user) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    const newUser = await User.createUserByEmailAndPassword(data);
    delete newUser.password;

    return newUser;
  }

  static async login({ email, password }) {
    const user = await User.findUserByEmail(email);
    if (!user) {
      throw new Error("가입되어있지 않은 이메일입니다.");
    }

    const correctPassword = user.password;
    const isPasswordRight = await bcrypt.compare(password, correctPassword);
    if (!isPasswordRight) {
      throw new Error("비밀번호가 틀렸습니다.");
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: user.id }, secretKey);

    return token;
  }

  static async userInfo(id) {
    const user = await User.findUserById(id);
    if (!user) {
      throw new Error("해당 유저가 존재하지 않습니다.");
    }
    delete user.password;

    return user;
  }
}
export { userService };
