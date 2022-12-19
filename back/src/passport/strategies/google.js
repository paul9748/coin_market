import { User } from '../../db/model/User';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

const config = {
  clientID : process.env.google_client_id,
  clientSecret : process.env.google_client_secret,
  callbackUrl : "/oauth2/redirect/google"

};

async function findOrCreateUser({email, display}) {
  const user = await User.findUserByEmail(email);

  if (user) {
    return user;
  }

  const created = await User.
}