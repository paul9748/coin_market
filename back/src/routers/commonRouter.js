import { Router } from "express";
import { commonService } from "../services/commonService";
import jwt from "jsonwebtoken";
import axios from "axios";
const commonRouter = Router();

commonRouter.get("/exchangeRate", async (req, res, next) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    let url =
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW" +
      req.query["countryCode"];
    let data = await axios.get(url);
    data = data.data;
    data[0]["basePrice"] = (data[0]["basePrice"] * 0.7).toFixed(1);
    data.push(
      jwt.sign(
        {
          currencyCode: data[0]["currencyCode"],
          exchangeRate: data[0]["basePrice"] / data[0]["currencyUnit"],
          modifiedAt: data[0]["modifiedAt"],
        },
        secretKey,
        {
          expiresIn: "10m",
        }
      )
    );

    res.json(data);
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
