import { db } from "../db";

class Deal {
  static async findDealByUserId(userId) {
    const dealList = db.deal.findUnique({
      where: {
        userId: userId,
      },
    });

    return dealList;
  }

  static async findDealByStatus(status) {
    const dealByStatus = db.deal.findMany({
      where: {
        dealStatus: status,
      },
    });

    return dealByStatus;
  }

  static async findDealByDealId(dealId) {
    const dealDetail = db.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    return dealDetail;
  }
}

export { Deal };
