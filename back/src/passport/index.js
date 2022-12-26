import passport from "passport";
import google from "./strategies/google";
import naver from "./strategies/naver";

function initialize() {
  passport.use(google);
  passport.use(naver);
}

export { initialize };
