import { db } from "../db";

class Deal {
  static async findDealByStatus(status) {
    const dealByStatus = db.deal.findMany({
      where: {
        dealStatus: status,
        // delivery: {
        //   resStatus: "waiting",
        // },
      },
    });

    return dealByStatus;
  }

  static async findDealByDeliveryStatus(resStatus) {
    const deal = db.deal.findMany({
      where: {
        delivery: {
          resStatus,
        },
      },
    });
    return deal;
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
