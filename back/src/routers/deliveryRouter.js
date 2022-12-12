import { Router } from "express";
import { deliveryService } from "../services/deliveryService";
import { loginRequired } from "../middlewares/loginRequired";

const deliveryRouter = Router();

//delivery 조회
deliveryRouter.get("/");

export { deliveryRouter };
