const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { Sell } from "../db/model/Sell";
import { v4 } from "uuid";
import { Buy } from "../db/model/Buy";
class sellService {
  static async sellOrder(data) {
    let orderData = data["order"];
    if (orderData["dealStatus"] != "SELL") {
      throw new Error("Bad Request");
    }
    let coins = data["coins"];
    orderData["userId"] = data["userId"];
    let { userId, dealStatus, imageUrl } = orderData;
    let order = await Sell.createDeal(
      data["userId"],
      orderData["dealStatus"],
      orderData["imageUrl"],
      0
    );

    for (let i of coins) {
      i["dealId"] = order["id"];
      let { dealId, coinId, dealAmount } = i;
      await Sell.createOrderCoin(dealId, coinId, dealAmount);
    }

    return "주문신청이 완료 되었습니다 : " + order["id"];
  }
  static async fixSellOrder(data) {
    const dealId = data["dealId"];
    const userId = data["userId"];
    const deal = await Sell.findDeal(dealId);

    if (deal.userId != userId) {
      throw new Error("본인 거래가 아닙니다");
    }
    if (deal.isActivate != 0) {
      throw new Error("이미 활성화된 주문 입니다");
    }
    //여기즘 거래 상태 조회 해서 주문처리대기 상태 인지 보고 판매중 으로 넘겨줘야함
    let coins = await Sell.findOrderCoinsByDealId(dealId);
    for (let i of coins) {
      await Sell.orderCoinUpdate(i["id"], i["dealAmount"]);
      await Sell.coinStockUpdate(i["coinId"], i["dealAmount"]);
    }
    await Sell.setDealActive(dealId);

    return "주문처리가 완료되었습니다 : " + dealId;
  }

  static async SellOrderAddressesAdd(data) {
    const userId = data["userId"];
    const deal = Sell.findDeal(data["dealId"]);

    if (deal.userId != userId) {
      throw new Error("본인 거래가 아닙니다");
    }
    if (deal.dealStatus != "SELL") {
      throw new Error("판매가 아닙니다");
    }

    const dealDetail = Sell.findDealDetailByDealId(data["dealId"]);

    if (dealDetail == null) {
      let dealDetail_data = {};
      dealDetail_data["dealId"] = data["dealId"];
      dealDetail_data["deliveryNumber"] = data["deliveryNumber"];
      dealDetail_data["resStatus"] = "WAITING";
      await Sell.dealDetailCreate(dealDetail_data);
      return "운송장번호가 업로드 되었습니다";
    } else {
      dealDetail["deliveryNumber"] = data["deliveryNumber"];
      await Sell.dealDetailUpdateDeliveryNumber(dealDetail);
      return "운송장번호가 변경 되었습니다";
    }
  }
}
export { sellService };
