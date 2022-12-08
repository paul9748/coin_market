import { db } from "../db";
import { v4 } from "uuid";

class Sell {
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

  static async findDeal(dealId) {
    return await db.deal.findUnique({
      where: {
        id: dealId,
      },
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
  static async findOrderCoinsByDealId(dealId) {
    return await db.OrderCoin.findMany({
      where: {
        dealId: dealId,
      },
    });
  }

  static async coinStockUpdate(coinId, dealAmount) {
    return await db.coin.update({
      where: {
        id: coinId,
      },
      data: {
        stockAmount: { increment: +dealAmount },
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
  static async dealDetailUpdateDeliveryNumber(dealDetail) {
    return await db.DealDetail.update({
      where: {
        id: dealDetail["id"],
      },
      data: {
        deliveryNumber: dealDetail["deliveryNumber"],
      },
    });
  }

  static async setDealActive(dealId) {
    return await db.deal.update({
      where: {
        id: dealId,
      },
      data: {
        isActivate: 1,
      },
    });
  }

  static async findDealDetailByDealId(dealId) {
    return await db.dealDetail.findFirst({
      where: {
        dealId,
      },
    });
  }
}

export { Sell };
