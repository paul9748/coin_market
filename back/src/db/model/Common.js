import { db } from "../db";
import { v4 } from "uuid";

class Common {
  static async findCoinsIdByCountryCode(countryCode) {
    return await db.coin.findMany({
      where: {
        country: { is: { countryCode: countryCode } },
        isUsed: true,
      },
      select: {
        id: true,
        currencyType: true,
        unitAmount: true,
        stockAmount: true,
      },
      orderBy: {
        unitAmount: "asc",
      },
    });
  }

  static async findAllCoinsSlotByCountry() {
    let data = await db.coin.findMany({
      select: {
        country: {
          select: {
            countryName: true,
          },
        },
        id: true,
        currencyType: true,
        unitAmount: true,
        stockAmount: true,
      },
      orderBy: {
        unitAmount: "asc",
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

  static async findCountrys(isHandled) {
    return await db.country.findMany({
      where: {
        isHandled: isHandled,
      },
    });
  }
}

export { Common };
