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
    let dealDetail = data["address"];
    if (orderData["dealStatus"] != "BUY") {
      throw new Error("Bad Request");
    }
    if (
      !("resAddress1" in dealDetail) ||
      !("resAddress2" in dealDetail) ||
      !("resName" in dealDetail)
    ) {
      throw new Error("주소누락");
    }
    for (let i of coins) {
      const stockData = await db.coin.findUnique({
        where: { id: i["coinId"] },
        select: { stockAmount: true },
      });
      if (i["dealAmount"] > stockData["stockAmount"]) {
        throw new Error("재고부족");
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
      while (true) {
        const stockOrder = await db.orderCoin.findMany({
          where: {
            coinId: i["coinId"],
            deal: {
              is: {
                dealStatus: "SELL",
                isActivate: 1,
              },
            },
          },
          take: 10,
          orderBy: {
            deal: {
              updatedAt: "asc",
            },
          },
        });
        for (let j of stockOrder) {
          if (j["stockAmount"] >= i["dealAmount"]) {
            await db.orderCoin.update({
              where: {
                id: j["id"],
              },
              data: {
                stockAmount: { increment: -i["dealAmount"] },
              },
            });
            i["dealAmount"] = 0;
            break;
          } else if (j["stockAmount"] < i["dealAmount"]) {
            await db.orderCoin.update({
              where: {
                id: j["id"],
              },
              data: {
                stockAmount: 0,
              },
            });
            i["dealAmount"] = i["dealAmount"] - j["stockAmount"];
          }
        }
        if (i["dealAmount"] == 0) {
          break;
        }
      }
    }
    dealDetail["dealId"] = order["id"];
    dealDetail["resStatus"] = "WAITING";
    await db.DealDetail.create({
      data: dealDetail,
    });

    return "구매가 완료 되었습니다.: " + order["id"];
  }
}
export { buyService };
