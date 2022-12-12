import { Delivery } from "../db/model/Delivery";

class deliveryService {
  static async deliveryDetail(dealId) {
    const delivery = await Delivery.findDeliveryByDealId(dealId);

    return delivery;
  }
}

export { deliveryService };
