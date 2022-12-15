import { db } from "../db";

class Deal {
  static async findDealByStatus(status, userId) {
    const dealByStatus = db.deal.findMany({
      where: {
        dealStatus: status,
        userId: userId,
        // delivery: {
        //   resStatus: "waiting",
        // },
      },
      include: {
        orderCoin: true,
        delivery: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return dealByStatus;
  }

  static async findDealByDeliveryStatus(resStatus, userId) {
    const deal = db.deal.findMany({
      where: {
        delivery: {
          resStatus,
        },
        userId: userId,
      },
      include: {
        orderCoin: true,
        delivery: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return deal;
  }

  static async findCompletedDeal(resStatus, userId) {
    let dealIdListZeroStock = await db.orderCoin.groupBy({
      by: ["dealId"],
      where: {
        deal: {
          isActivate: 1,
          userId: userId,
          dealStatus: resStatus,
        },
      },
      _sum: {
        stockAmount: true,
      },
      having: {
        stockAmount: {
          _sum: { in: 0 },
        },
      },
    });
    let setData = [];

    for (let i of dealIdListZeroStock) {
      setData.push(i["dealId"]);
    }
    const deal = await db.deal.findMany({
      where: { id: { in: setData } },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return deal;
  }

  static async findDealByDealId(dealId) {
    const dealDetail = await db.deal.findUnique({
      where: {
        id: dealId,
      },
      include: {
        orderCoin: true,
        delivery: true,
      },
    });

    return dealDetail;
  }
  static async countDealByUserId(userId) {
    let countDataByDealStatus = await db.deal.groupBy({
      by: ["dealStatus"],
      where: {
        userId: userId,
      },
      _count: true,
    });
    let countDataByDealStatusDict = {};
    for (let i of countDataByDealStatus) {
      countDataByDealStatusDict[i["dealStatus"]] = i["_count"];
    }
    const countDataByDelivery = await db.delivery.groupBy({
      by: ["resStatus"],
      where: {
        Deal: {
          userId: userId,
        },
      },
      _count: true,
    });
    let countDataByDeliveryDict = {};
    for (let i of countDataByDelivery) {
      countDataByDeliveryDict[i["resStatus"]] = i["_count"];
    }

    /////////////////////
    let dealIdListZeroStock = await db.orderCoin.groupBy({
      by: ["dealId"],
      where: {
        deal: {
          isActivate: 1,
          userId: userId,
        },
      },
      _sum: {
        stockAmount: true,
      },
      having: {
        stockAmount: {
          _sum: { in: 0 },
        },
      },
    });
    let setData = [];

    for (let i of dealIdListZeroStock) {
      setData.push(i["dealId"]);
    }
    const completeDeal = await db.deal.groupBy({
      by: ["dealStatus"],
      where: { id: { in: setData } },
      _count: true,
    });
    ///////////

    let completeDealDict = {};
    for (let i of completeDeal) {
      completeDealDict[i["dealStatus"]] = i["_count"];
    }

    let infoData = {};
    const infoKeyList = [
      "BUY",
      "SELL",
      "delivery",
      "completion",
      "BUYCOMP",
      "SELLCOMP",
    ];
    infoData["BUY"] = countDataByDealStatusDict["BUY"];
    infoData["SELL"] = countDataByDealStatusDict["SELL"];
    infoData["delivery"] = countDataByDeliveryDict["delivery"];
    infoData["completion"] = countDataByDeliveryDict["completion"];
    infoData["BUYCOMP"] = completeDealDict["BUY"];
    infoData["SELLCOMP"] = completeDealDict["SELL"];
    for (let i of infoKeyList) {
      if (!infoData[i]) {
        infoData[i] = 0;
      }
    }
    return infoData;
  }
}

export { Deal };
