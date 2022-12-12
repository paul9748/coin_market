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
}

export { Delivery };
