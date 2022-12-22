import { User } from "../../db/model/User";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { tokenService } from "../../services/tokenService";

const config = {
  clientID: process.env.google_client_id,
  clientSecret: process.env.google_client_secret,
  callbackUrl: "/oauth2/redirect/google",
};

async function findOrCreateUser({ email, display }) {
  const user = await User.findUserByEmail(email);

  if (user) {
    return user;
  }

  const created = await User.createUserByEmailAndPassword({
    email: email,
    userName: displayName,
    password: "googleLogin",
    phoneNumber: "googleLogin",
  });

  return created;
}

module.exports = new GoogleStrategy(config, async (profile, done) => {
  const { email, displayName } = profile;
  try {
    const user = await findOrCreateUser({ email, displayName });
    const token = await tokenService.createToken(user.userId);
    done(null, token);
  } catch (error) {
    done(error);
  }
});
