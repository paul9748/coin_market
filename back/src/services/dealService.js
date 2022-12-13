import { Deal } from "../db/model/Deal";

class dealService {
  //상태별deal or deal 전체 조회
  static async findDealByStatus(status, userId) {
    const dealListByStatus = await Deal.findDealByStatus(status, userId);

    return dealListByStatus;
  }

  static async findDealByResStatus(resStatus, userId) {
    const dealListByResStatus = await Deal.findDealByDeliveryStatus(
      resStatus,
      userId
    );

    return dealListByResStatus;
  }

  //해당거래상세조회
  static async findDealDetail(dealId) {
    const dealDetail = await Deal.findDealByDealId(dealId);

    return dealDetail;
  }
  static async countDealByUserId(userId) {
    const countdata = await Deal.countDealByUserId(userId);
    return countdata;
  }
}

export { dealService };
