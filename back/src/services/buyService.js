const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class buyService {
  //
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

  //todo deal_details 만들기
  static async buyOrder(data) {
    let orderData = data["order"];
    let coins = data["coins"];
    if (orderData["dealStatus"] != "BUY") {
      return new err("Bad Request");
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
    orderData["userId"] = "12345678";
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

    return "Complete purchase order : " + order["id"];
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
