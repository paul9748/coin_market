import { Router } from "express";
import { userAuthService } from "../services/userService";
const userAuthRouter = Router();
userAuthRouter.get("/user", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await userAuthService.findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});
userAuthRouter.post("/user", async (req, res, next) => {
  try {
    const data = req.body;
    let user = await userAuthService.createUserByEmailAndPassword(data);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { userAuthRouter };
