import { db } from "../db";
import { v4 } from "uuid";

class Buy {
  static async CountryIdByCountryCode(countryCode) {
    return await db.Country.findFirst({
      where: {
        countryCode: countryCode,
      },
      select: {
        id: true,
      },
    });
  }

  static async findCoinsByCountryId(countryId) {
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

  static async findAllCoins() {
    return await db.coin.findMany({
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
  }

  static async findCoin(coinId) {
    return await db.coin.findUnique({
      where: { id: coinId },
      select: { stockAmount: true },
    });
  }

  static async createDeal(userId, dealStatus, imageUrl, isActivate) {
    return await db.deal.create({
      data: {
        userId,
        dealStatus,
        imageUrl,
        isActivate,
      },
    });
  }
  static createOrderCoin(dealId, coinId, dealAmount) {
    return db.OrderCoin.create({
      data: {
        dealId: dealId,
        coinId: coinId,
        dealAmount: dealAmount,
      },
    });
  }
  static coinStockUpdate(coinId, dealAmount) {
    return db.coin.update({
      where: {
        id: coinId,
      },
      data: {
        stockAmount: { increment: -dealAmount },
      },
    });
  }
  static async findStockOrderByCoinId(coinId) {
    return await db.orderCoin.findMany({
      where: {
        coinId,
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
  }

  static orderCoinUpdate(id, stockAmount) {
    return db.orderCoin.update({
      where: {
        id: id,
      },
      data: {
        stockAmount: stockAmount,
      },
    });
  }
  static async dealDetailCreate(dealDetail) {
    return await db.delivery.create({
      data: dealDetail,
    });
  }

  static async createDealTest(
    userId,
    dealStatus,
    imageUrl,
    isActivate,
    delivery,
    createOrderCoinList,
    updateDealCoinList
  ) {
    let orderTransactionList = [];
    const createDeal = db.deal.create({
      data: {
        userId,
        dealStatus,
        imageUrl,
        isActivate,
        delivery: {
          create: delivery,
        },
        orderCoin: {
          create: createOrderCoinList,
        },
      },
    });
    orderTransactionList.push(createDeal);
    let dateCoinStocks;
    for (let i of createOrderCoinList) {
      dateCoinStocks = db.coin.update({
        where: {
          id: i["coinId"],
        },
        data: {
          stockAmount: { increment: -i["dealAmount"] },
        },
      });
      orderTransactionList.push(dateCoinStocks);
    }

    if (updateDealCoinList["idList"].length != 1) {
      const bulkUpdateOrderCoinStocks = db.orderCoin.updateMany({
        where: {
          id: {
            in: updateDealCoinList["idList"],
          },
        },
        data: {
          stockAmount: 0,
        },
      });
      orderTransactionList.push(bulkUpdateOrderCoinStocks);
    }
    if (Object.keys(updateDealCoinList["notZero"]) != []) {
      let lastUpdateOrderCoinStocks;
      for (let i of Object.keys(updateDealCoinList["notZero"])) {
        lastUpdateOrderCoinStocks = db.orderCoin.update({
          where: {
            id: i,
          },
          data: {
            stockAmount: updateDealCoinList["notZero"][i],
          },
        });
        orderTransactionList.push(lastUpdateOrderCoinStocks);
      }
    }
    return await db.$transaction(orderTransactionList);
  }
}

export { Buy };
