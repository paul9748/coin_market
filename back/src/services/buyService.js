import { Buy } from "../db/model/Buy";
const { db } = require("../db/db");
class buyService {
  static async getCountryInfo(countryCode) {
    const countryId = await Buy.CountryIdByCountryCode(countryCode);

    return Buy.findCoinsByCountryId(countryId);
  }

  static async getAllInfo() {
    const data = Buy.findAllCoins();
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
  static async buyOrder(data) {
    let orderData = data["order"];
    const coins = data["coins"];
    let dealDetail = data["address"];
    const pay = data["pay"]; //결제정보
    //TODO: 결제정보 확인및 금액확인 로직 필요

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
      await db.$transaction([
        Buy.createOrderCoin(i["dealId"], i["coinId"], i["dealAmount"]),
        Buy.coinStockUpdate(i["coinId"], i["dealAmount"]),
      ]);

      let changedOrder = [];

      while (true) {
        const stockOrder = await Buy.findStockOrderByCoinId(i["coinId"]);

        for (let j of stockOrder) {
          //TODO: 해당 주문  완료시에 판매자 지갑에 금액 추가 필요
          if (j["stockAmount"] >= i["dealAmount"]) {
            changedOrder.push(
              Buy.orderCoinUpdate(j["id"], j["stockAmount"] - i["dealAmount"])
            );
            i["dealAmount"] = 0;

            break;
          } else if (j["stockAmount"] < i["dealAmount"]) {
            changedOrder.push(Buy.orderCoinUpdate(j["id"], 0));
            i["dealAmount"] = i["dealAmount"] - j["stockAmount"];
          }
        }
        await db.$transaction(changedOrder);
        changedOrder = [];
        if (i["dealAmount"] == 0) {
          break;
        }
      }
    }
    dealDetail["dealId"] = order["id"];
    dealDetail["resStatus"] = "waiting";
    await Buy.dealDetailCreate(dealDetail);

    return "구매가 완료 되었습니다.: " + order["id"];
  }
}
export { buyService };
