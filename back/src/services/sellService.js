const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class sellService {
  //TODO 테스트 해야함
  static async sellOrder(data) {
    let orderData = data["order"];
    if (orderData["dealStatus"] != "SELL") {
      throw new Error("Bad Request");
    }
    let coins = data["coins"];
    orderData["userId"] = "4dc026c8-30b3-4510-a8d1-3dd6df8ba43e";
    let order = await db.deal.create({
      data: orderData,
    });

    for (let i of coins) {
      i["dealId"] = order["id"];
      await db.OrderCoin.create({
        data: i,
      });
    }

    return "주문신청이 완료 되었습니다 : " + order["id"];
  }
  static async fixSellOrder(data) {
    //TODO: 로그인 서비스랑 연결 해야함
    const dealId = data["dealId"];
    const userId = "4dc026c8-30b3-4510-a8d1-3dd6df8ba43e";
    const deal = await db.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (deal.userId != userId) {
      throw new Error("본인 거래가 아닙니다");
    }
    if (deal.isActivate != 0) {
      throw new Error("이미 활성화된 주문 입니다");
    }
    //여기즘 거래 상태 조회 해서 주문처리대기 상태 인지 보고 판매중 으로 넘겨줘야함
    let coins = await db.OrderCoin.findMany({
      where: {
        dealId: dealId,
      },
    });
    for (let i of coins) {
      await db.OrderCoin.update({
        where: {
          id: i["id"],
        },
        data: {
          stockAmount: i["dealAmount"],
        },
      });
      await db.coin.update({
        where: {
          id: i["coinId"],
        },
        data: {
          stockAmount: { increment: +i["dealAmount"] },
        },
      });
    }
    await db.deal.update({
      where: {
        id: dealId,
      },
      data: {
        isActivate: 1,
      },
    });

    return "주문처리가 완료되었습니다 : " + dealId;
  }
}
export { sellService };
