import { Router } from "express";
import { sellService } from "../services/sellService";
import { loginRequired } from "../middlewares/loginRequired";

const sellRouter = Router();
//TODO: 테스트 해야함
sellRouter.post("/sell", loginRequired, async (req, res, next) => {
  try {
    const data = req.body;
    data["userId"] = req.userId;
    let orderData = await sellService.sellOrder(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});

sellRouter.post("/sell/:dealId", loginRequired, async (req, res, next) => {
  try {
    const dealId = req.params.dealId;
    let data = {};
    data["dealId"] = dealId;
    data["userId"] = req.userId;
    let orderData = await sellService.fixSellOrder(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});
sellRouter.post(
  "/sell/:dealId/deliveryNumber",
  loginRequired,
  async (req, res, next) => {
    try {
      const dealId = req.params.dealId;
      let data = {};
      data["dealId"] = dealId;
      data["deliveryNumber"] = req.body["deliveryNumber"];
      data["userId"] = req.userId;
      // data에 로그인 유저 정보도 주기
      let orderData = await sellService.SellOrderAddressesAdd(data);
      res.json(orderData);
    } catch (err) {
      next(err);
    }
  }
);
//deliveryNumber
export { sellRouter };
