import { Router } from "express";
import { deliveryService } from "../services/deliveryService";
import { loginRequired } from "../middlewares/loginRequired";

const deliveryRouter = Router();

//delivery 조회
deliveryRouter.get(
  "/users/deals/delivery/:dealId",
  loginRequired,
  async (req, res, next) => {
    try {
      const delivery = await deliveryService.deliveryDetail(req.params.dealId);

      res.status(200).json(delivery);
    } catch (err) {
      next(err);
    }
  }
);

export { deliveryRouter };
