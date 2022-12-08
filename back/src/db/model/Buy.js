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
  static async createOrderCoin(dealId, coinId, dealAmount) {
    return await db.OrderCoin.create({
      data: {
        dealId: dealId,
        coinId: coinId,
        dealAmount: dealAmount,
      },
    });
  }
  static async coinStockUpdate(coinId, dealAmount) {
    return await db.coin.update({
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

  static async orderCoinUpdate(id, stockAmount) {
    return await db.orderCoin.update({
      where: {
        id: id,
      },
      data: {
        stockAmount: stockAmount,
      },
    });
  }
  static async dealDetailCreate(dealDetail) {
    return await db.DealDetail.create({
      data: dealDetail,
    });
  }
}

export { Buy };
