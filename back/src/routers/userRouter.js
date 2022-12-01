import { Router } from "express";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";

const userAuthRouter = Router();

//회원가입
userAuthRouter.post("/users/register", async (req, res, next) => {
  try {
    const data = req.body;
    let user = await userService.creatUser(data);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//로그인
userAuthRouter.post("/users/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userService.login({ email, password });

    res.status(201).json(loginUser);
  } catch (err) {
    next(err);
  }
});

//회원정보조회
userAuthRouter.get("/users", loginRequired, async (req, res, next) => {
  try {
    const user = await userService.userInfo(req.userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export { userAuthRouter };
