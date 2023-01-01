import { User } from "../../db/model/User";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { tokenService } from "../../services/tokenService";

const config = {
  clientID: process.env.google_client_id,
  clientSecret: process.env.google_client_secret,
  callbackURL: "/oauth2/redirect/google",
  scope: ["profile", "email"],
  // callbackUrl: "http://localhost:3000/oauth2/redirect/google",
};

async function findOrCreateUser({ email, displayName, isEmailAuthorized }) {
  const user = await User.findUserByEmail(email);

  if (user) {
    return user;
  }

  const created = await User.createUserByEmailAndPassword({
    email: email,
    userName: displayName,
    isEmailAuthorized: isEmailAuthorized,
    password: "googleLogin",
    phoneNumber: "googleLogin",
  });

  return created;
}

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    const displayName = profile.displayName;
    const email = profile.emails[0].value;
    const isEmailAuthorized = profile.emails[0].verified;

    try {
      const user = await findOrCreateUser({
        email,
        displayName,
        isEmailAuthorized,
      });
      const token = await tokenService.createToken(user.userId);
      done(null, token);
    } catch (error) {
      done(error);
    }
  }
);
