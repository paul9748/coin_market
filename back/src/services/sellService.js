const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class sellService {
  //TODO 테스트 해야함
  static async sellOrder(data) {
    let orderData = data["order"];
    if (orderData["dealStatus"] != "SELL") {
      return new err("Bad Request");
    }
    let coins = data["coins"];
    orderData["userId"] = "12345678";
    let order = await db.deal.create({
      data: orderData,
    });

    for (let i of coins) {
      i["dealId"] = order["id"];
      await db.OrderCoin.create({
        data: i,
      });
      //재고 수정 코드
      // await db.coin.update({
      //   where: {
      //     id: i["coinId"],
      //   },
      //   data: {
      //     stockAmount: { increment: +i["dealAmount"] },
      //   },
      // });
    }

    return "주문신청이 완료 되었습니다 : " + order["id"];
  }
  static async fixSellOrder(data) {
    let dealId = data["dealId"];
    //TODO: 로그인 서비스랑 연결 해야함
    userId = "12345678";
    let coins = await db.deal.findMany({
      where: {
        dealId: dealId,
      },
    });

    for (let i of coins) {
      await db.coin.update({
        where: {
          id: i["coinId"],
        },
        data: {
          stockAmount: { increment: +i["dealAmount"] },
        },
      });
    }

    return "주문처리가 완료되었습니다 : " + order["id"];
  }

  static async findUserById(id) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
export { sellService };
