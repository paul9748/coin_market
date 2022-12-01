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

commonRouter.get("/counties", async (req, res, next) => {
  try {
    const { handled } = req.query;
    let data;
    if (handled == false) {
      data = await commonService.getCountryNotHandling(userId);
    }
    const user = await commonService.getCountryNotHandling(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});
// commonRouter.post("/common", async (req, res, next) => {
//   try {
//     const data = req.body;
//     console.log(data);
//     let user = await commonService.commonOrder(data);
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

export { commonRouter };
