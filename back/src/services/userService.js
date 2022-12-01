import { User } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  //회원가입
  static async createUser(data) {
    const email = data.email;

    const user = await User.findUserByEmail(email);
    if (user) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    const newUser = await User.createUserByEmailAndPassword(data);

    delete newUser.password;

    return newUser;
  }

  //로그인
  static async login({ email, password }) {
    const user = await User.findUserByEmail(email);
    if (!user) {
      throw new Error("가입되어있지 않은 이메일입니다.");
    }

    if (user.role == "WITHDRAWAL") {
      throw new Error("탈퇴한 유저입니다.");
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

  //회원정보조회
  static async userInfo(id) {
    const user = await User.findUserById(id);
    if (!user) {
      throw new Error("해당 유저가 존재하지 않습니다.");
    }

    delete user.password;

    return user;
  }

  //회원정보수정
  static async userUpdate(id, body) {
    const user = await User.findUserById(id);
    if (!user) {
      throw new Error("해당 유저가 존재하지 않습니다.");
    }

    if (!body.role) {
      const name = body.name;
      const nickName = body.nickName;
      const phoneNumber = body.phoneNumber;
      const updatedUser = await User.updateUser({
        id,
        name,
        nickName,
        phoneNumber,
      });
      delete updatedUser.password;

      return updatedUser;
    } else {
      const role = body.role;
      const withdrawalUser = await User.withdrawalUser({
        id,
        role,
      });

      return withdrawalUser;
    }
  }

  //비밀번호 검증
  static async verificationPassword(id, password) {
    const user = await User.findUserById(id);

    const correctPassword = user.password;
    const isPasswordRight = await bcrypt.compare(password, correctPassword);
    if (!isPasswordRight) {
      throw new Error("비밀번호가 틀렸습니다.");
    }
    return console.log("ok");
  }

  //비밀번호 변경
  static async updatePassword(id, password) {
    const user = await User.updatePassword({ id, password });

    delete user.password;

    return user;
  }
}
export { userService };
