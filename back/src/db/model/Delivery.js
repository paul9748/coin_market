import { db } from "../db";

class Delivery {
  static async findDeliveryByDealId(dealId) {
    const delivery = db.delivery.findUnique({
      where: {
        dealId,
      },
    });

    return delivery;
  }

  static async findDeliveryByStatus(status) {
    const delivery = db.delivery.findMany({
      where: {
        resStatus: status,
      },
    });

    return delivery;
  }
}

export { Delivery };
