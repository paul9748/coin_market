const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { Buy } from "../db/model/Buy";
class buyService {
  static async getCountryInfo(countryCode) {
    const countryId = await Buy.CountryIdByCountryCode(countryCode);

    return Buy.findCoinsByCountryId(countryId);
  }

  static async getAllInfo() {
    let data = Buy.findAllCoins();
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
    // try {
    let orderData = data["order"];
    let coins = data["coins"];
    let dealDetail = data["address"];
    orderData["userId"] = data["userId"];
    orderData["isActivate"] = 1;
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
      const stockData = Buy.findCoin(i["coinId"]);
      if (i["dealAmount"] > stockData["stockAmount"]) {
        throw new Error("재고부족");
      }
    }

    let order = await Buy.createDeal(
      data["userId"],
      orderData["dealStatus"],
      orderData["imageUrl"],
      orderData["isActivate"]
    );

    for (let i of coins) {
      i["dealId"] = order["id"];
      await Buy.createOrderCoin(i["dealId"], i["coinId"], i["dealAmount"]);
      await Buy.coinStockUpdate(i["coinId"], i["dealAmount"]);
      while (true) {
        const stockOrder = await Buy.findStockOrderByCoinId(i["coinId"]);

        for (let j of stockOrder) {
          if (j["stockAmount"] >= i["dealAmount"]) {
            await Buy.orderCoinUpdate(
              j["id"],
              j["stockAmount"] - i["dealAmount"]
            );
            i["dealAmount"] = 0;
            break;
          } else if (j["stockAmount"] < i["dealAmount"]) {
            //TODO: 모델 만들기 여기 까지 함
            await Buy.orderCoinUpdate(j["id"], 0);
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
    await Buy.dealDetailCreate(dealDetail);

    return "구매가 완료 되었습니다.: " + order["id"];
    // } catch {
    //   throw new Error("구매실패");
    // }
  }
}
export { buyService };
