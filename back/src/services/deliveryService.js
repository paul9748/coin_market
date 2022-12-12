import { Delivery } from "../db/model/Delivery";

class deliveryService {
  static async deliveryDetail(dealId) {
    const delivery = await Delivery.findDeliveryByDealId(dealId);

    return delivery;
  }

  static async deliveryByStatus(status) {
    const delivery = await Delivery.findDeliveryByStatus(status);

    return delivery;
  }
}

export { deliveryService };
