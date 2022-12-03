import { Router } from "express";
import { sellService } from "../services/sellService";
const sellRouter = Router();
//TODO: 테스트 해야함
sellRouter.post("/sell", async (req, res, next) => {
  try {
    const data = req.body;
    let orderData = await sellService.sellOrder(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});

sellRouter.post("/sell/:dealId", async (req, res, next) => {
  try {
    const dealId = req.params.dealId;
    let data = {};
    data["dealId"] = dealId;
    // data에 로그인 유저 정보도 주기
    let orderData = await sellService.fixSellOrder(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});
sellRouter.post("/sell/:dealId/deliveryNumber", async (req, res, next) => {
  try {
    const dealId = req.params.dealId;
    let data = {};
    data["dealId"] = dealId;
    data["deliveryNumber"] = req.body["deliveryNumber"];
    // data에 로그인 유저 정보도 주기
    let orderData = await sellService.SellOrderAddressesAdd(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});
//deliveryNumber
export { sellRouter };
