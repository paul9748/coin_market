import { User } from "../db/model/User";
import bcrypt from "bcrypt";
import { tokenService } from "./tokenService";

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

    if (user.role == "withdrawal") {
      throw new Error("탈퇴한 유저입니다.");
    }

    const correctPassword = user.password;
    const isPasswordRight = await bcrypt.compare(password, correctPassword);
    if (!isPasswordRight) {
      throw new Error("비밀번호가 틀렸습니다.");
    }

    const newToken = tokenService.createToken(user.id);
    const data = {
      userId: user.id,
      refreshToken: (await newToken).refresh_token,
    };

    const findToken = await tokenService.findToken(user.id);
    if (findToken) {
      const updateToken = await tokenService.updateToken(
        user.id,
        data.refreshToken
      );
      return newToken;
    } else {
      const createDb = await tokenService.createdTokenDb(data);

      return newToken;
    }
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

  //회원정보수정 , 회원탈퇴
  static async userUpdate(id, body) {
    const user = await User.findUserById(id);
    if (!user) {
      throw new Error("해당 유저가 존재하지 않습니다.");
    }

    if (!body.role) {
      const userName = body.userName;
      const phoneNumber = body.phoneNumber;
      const updatedUser = await User.updateUser({
        id,
        userName,
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
