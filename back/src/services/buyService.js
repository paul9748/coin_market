const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class buyService {
  static async getCountryInfo(countryCode) {
    const countryId = await db.Country.findFirst({
      where: {
        countryCode: countryCode,
      },
      select: {
        id: true,
      },
    });

    return await db.coin.findMany({
      where: {
        countryId: countryId["id"],
        isUsed: true,
      },
      select: {
        currencyType: true,
        stockAmount: true,
      },
    });
  }

  static async getAllInfo() {
    let data = await db.coin.findMany({
      select: {
        country: {
          select: {
            countryName: true,
          },
        },
        id: true,
        currencyType: true,
        stockAmount: true,
      },
    });
    let re_data = {};
    for (const i of data) {
      let country = i["country"]["countryName"];

      if (Object.keys(re_data).includes(country)) {
        delete i["country"];
        re_data[country].push(i);
      } else {
        delete i["country"];
        re_data[country] = [i];
      }
    }
    return re_data;
  }

  //TODO: deal_details 만들기
  static async buyOrder(data) {
    let orderData = data["order"];
    let coins = data["coins"];
    if (orderData["dealStatus"] != "BUY") {
      throw new Error("Bad Request");
    }
    for (let i of coins) {
      const stockData = await db.coin.findUnique({
        where: { id: i["coinId"] },
        select: { stockAmount: true },
      });
      if (i["dealAmount"] > stockData["stockAmount"]) {
        return "재고부족";
      }
    }
    orderData["userId"] = "4dc026c8-30b3-4510-a8d1-3dd6df8ba43e";
    orderData["isActivate"] = 1;
    let order = await db.deal.create({
      data: orderData,
    });

    for (let i of coins) {
      i["dealId"] = order["id"];
      await db.OrderCoin.create({
        data: i,
      });
      await db.coin.update({
        where: {
          id: i["coinId"],
        },
        data: {
          stockAmount: { increment: -i["dealAmount"] },
        },
      });
    }
    //TODO: 이거 이후에 각 판매 코인 날짜순으로 10개 정도 불러와서 총 구매 수량 이랑 거래완료 수량계산해서 판매 된 만큼 해당 유저 환전가능금액 변경 까지 해야함

    return "구매가 완료 되었습니다.: " + order["id"];
  }

  static async findUserById(id) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
export { buyService };
