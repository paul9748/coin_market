import { User } from "../../db/model/User";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { tokenService } from "../../services/tokenService";

const config = {
  clientID: process.env.naver_client_id,
  clientSecret: process.env.naver_client_secret,
  callbackURL: "/auth/naver/callback",
};

async function findOrCreateUser({ email, name, mobile, isEmailAuthorized }) {
  if (mobile == undefined) {
    mobile = "naverLogin";
  }

  const user = await User.findUserByEmail(email);

  if (user) {
    return user;
  }

  const created = await User.createUserByEmailAndPassword({
    email: email,
    userName: name,
    isEmailAuthorized: isEmailAuthorized,
    password: "naverLogin",
    phoneNumber: mobile,
  });
  return created;
}

module.exports = new NaverStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    const { email, name, mobile } = profile;
    const isEmailAuthorized = true;

    try {
      const user = await findOrCreateUser({
        email,
        name,
        mobile,
        isEmailAuthorized,
      });
      const token = await tokenService.createToken(user.userId);
      done(null, token);
    } catch (error) {
      done(error);
    }
  }
);
