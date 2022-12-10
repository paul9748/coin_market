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
    let delivery = data["address"];
    delivery["resStatus"] = "waiting";
    const pay = data["pay"]; //결제정보
    //TODO: 결제정보 확인및 금액확인 로직 필요

    orderData["userId"] = data["userId"];
    orderData["isActivate"] = 1;
    if (orderData["dealStatus"] != "BUY") {
      throw new Error("Bad Request");
    }
    if (
      !("resAddress1" in delivery) ||
      !("resAddress2" in delivery) ||
      !("resName" in delivery)
    ) {
      throw new Error("주소누락");
    }
    for (let i of coins) {
      const stockData = Buy.findCoin(i["coinId"]);
      if (i["dealAmount"] > stockData["stockAmount"]) {
        throw new Error("재고부족");
      }
    }

    //생성할 거래코인 리스트
    let createOrderCoinList = [];
    //업데이트할 거리코인 리스트
    let updateDealCoinList = { idList: [], notZero: {} };
    for (let i of coins) {
      createOrderCoinList.push({
        coinId: i["coinId"],
        dealAmount: i["dealAmount"],
      });
      while (true) {
        const stockOrder = await Buy.findStockOrderByCoinId(i["coinId"]);
        for (let j of stockOrder) {
          //TODO: 해당 주문  완료시에 판매자 지갑에 금액 추가 필요
          if (j["stockAmount"] > i["dealAmount"]) {
            updateDealCoinList["notZero"][j["id"]] =
              j["stockAmount"] - i["dealAmount"];
            i["dealAmount"] = 0;
            break;
          } else if (j["stockAmount"] < i["dealAmount"]) {
            updateDealCoinList["idList"].push(j["id"]);
            i["dealAmount"] = i["dealAmount"] - j["stockAmount"];
          } else if (j["stockAmount"] == i["dealAmount"]) {
            updateDealCoinList["idList"].push(j["id"]);
            i["dealAmount"] = 0;
            break;
          }
        }
        if (i["dealAmount"] == 0) {
          break;
        }
      }
    }

    let order = await Buy.createDealTest(
      data["userId"],
      orderData["dealStatus"],
      orderData["imageUrl"],
      orderData["isActivate"],
      delivery,
      createOrderCoinList,
      updateDealCoinList
    );
    return "구매가 완료 되었습니다.: " + order;
  }
}
export { buyService };
