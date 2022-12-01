import { Router } from "express";
import { buyService } from "../services/sellService";
const sellRouter = Router();
//TODO: 테스트 해야함
sellRouter.post("/sell", async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    let orderData = await buyService.sellOrder(data);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});

sellRouter.post("/sell/:dealId", async (req, res, next) => {
  try {
    const dealId = req.params.dealId;
    let orderData = await buyService.fixSellOrder(dealId);
    res.json(orderData);
  } catch (err) {
    next(err);
  }
});

export { sellRouter };
