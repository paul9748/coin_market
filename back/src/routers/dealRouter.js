import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { dealService } from "../services/dealService";
import { deliveryService } from "../services/deliveryService";

const dealRouter = Router();

//모든deal조회 or 상태별deal조회
dealRouter.get("/users/deals", loginRequired, async (req, res, next) => {
  try {
    if (!req.query.status) {
      const dealList = await dealService.findeDealByStatus();

      res.status(200).json(dealList);
    } else if (req.query.status == "BUY" || req.query.status == "SELL") {
      const dealByStatus = await dealService.findeDealByStatus(
        req.query.status
      );

      res.status(200).json(dealByStatus);
    } else {
      const deliveryByStatus = await deliveryService.deliveryByStatus(
        req.query.status
      );

      res.status(200).json(deliveryByStatus);
    }
  } catch (err) {
    next(err);
  }
});

//해당거래상세조회
dealRouter.get(
  "/users/deals/:dealId",
  loginRequired,
  async (req, res, next) => {
    try {
      const dealId = req.params.dealId;
      const dealDetail = await dealService.findDealDetail(dealId);
      const delivery = await deliveryService.deliveryDetail(dealId);

      res.status(200).json({ dealDetail, delivery });
    } catch (err) {
      next(err);
    }
  }
);

export { dealRouter };
