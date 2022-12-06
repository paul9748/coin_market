import { Router } from "express";
import { buyService } from "../services/buyService";
import { loginRequired } from "../middlewares/loginRequired";

const buyRouter = Router();
buyRouter.get("/countries/currencyType", async (req, res, next) => {
  try {
    if (req.query["countryCode"] == null) {
      const info = await buyService.getAllInfo();
      res.json(info);
    } else {
      const info = await buyService.getCountryInfo(req.query["countryCode"]);
      res.json(info);
    }
  } catch (err) {
    next(err);
  }
});
//TODO:  결제 서비스랑 붙여서 결제 검증도 해야함, 결제시 기준 환율 넣을 칼럼 필요
buyRouter.post("/buy", loginRequired, async (req, res, next) => {
  try {
    const data = req.body;
    data["userId"] = req.userId;
    let user = await buyService.buyOrder(data);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { buyRouter };
