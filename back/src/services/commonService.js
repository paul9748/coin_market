const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { v4 } from "uuid";
class commonService {
  //
  static async getCurrencyInfo(countryCode) {
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

  static async getAllCurrencyInfo() {
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

  static async getCountiesInfo(isHandled) {
    return db.country.findMany({
      where: {
        isHandled: isHandled,
      },
    });
  }
}
export { commonService };
