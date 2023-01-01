import { db } from "../db";

class Analysis {
  static async findCoinList() {
    const coins = await db.Coin.findMany({
      select: {
        country: {
          select: {
            exchangeRateCode: true,
          },
        },
        id: true,
        unitAmount: true,
      },
    });
    let data = {};
    for (let i of coins) {
      if (data.hasOwnProperty(i["country"]["exchangeRateCode"])) {
        data[i["country"]["exchangeRateCode"]][i["unitAmount"]] = i["id"];
      } else {
        data[i["country"]["exchangeRateCode"]] = {};
        data[i["country"]["exchangeRateCode"]][i["unitAmount"]] = i["id"];
      }
    }
    return data;
  }
}

export { Analysis };
