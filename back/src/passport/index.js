import passport from "passport";
import google from "./strategies/google";

function initialize() {
  passport.use(google);
}

export { initialize };
