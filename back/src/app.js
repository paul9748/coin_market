import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { addressRouter } from "./routers/addressRouter";
import { tokenRouter } from "./routers/tokenRouter";
import { buyRouter } from "./routers/buyRouter";
import { analysisRouter } from "./routers/analysisRouter";
import { commonRouter } from "./routers/commonRouter";
import { sellRouter } from "./routers/sellRouter";
import { dealRouter } from "./routers/dealRouter";
import { deliveryRouter } from "./routers/deliveryRouter";
import { walletRouter } from "./routers/walletRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
// import {passport} from "passport"
// import { GoogleStrategy} from "passport-google-oauth20"

// passport.use(new GoogleStrategy({
//   clientId: process.env.client_id,
//   clientSecret: process.env.client_secret,
//   callbackURL : "http://localhost:3000/google/callback"
// },
// function(accessToken, refreshToken, porfile, cb) {
//   U
// }))

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static("images"));
// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});
// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(addressRouter);
app.use(tokenRouter);
app.use(analysisRouter);
app.use(commonRouter);
app.use(buyRouter);
app.use(sellRouter);
app.use(dealRouter);
app.use(deliveryRouter);
app.use(walletRouter);
// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
