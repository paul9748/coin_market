import { Router } from "express";
import { commonService } from "../services/commonService";
const request = require("request-promise-native");
const commonRouter = Router();

commonRouter.get("/exchangeRate", async (req, res, next) => {
  try {
    let url =
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW" +
      req.query["countryCode"];
    let data = await request(url, function (err, res, body) {
      return body.slice(1, -1);
    });
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

commonRouter.get("/countries/currencyType", async (req, res, next) => {
  try {
    let data;
    if (req.query["countryCode"]) {
      data = await commonService.getCurrencyInfo(req.query["countryCode"]);
    } else {
      data = await commonService.getAllCurrencyInfo();
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

commonRouter.get("/counties", async (req, res, next) => {
  try {
    const data = await commonService.getCountiesInfo(
      JSON.parse(req.query["isHandled"])
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export { commonRouter };
