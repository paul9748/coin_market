import { Deal } from "../db/model/Deal";

class dealService {
  //deal조회
  static async findDealList(userId) {
    const dealList = await Deal.findDealByUserId(userId);

    return dealList;
  }

  //상태별deal조회
  static async findeDealByStatus(status) {
    const dealListByStatus = await Deal.findDealByStatus(status);

    return dealListByStatus;
  }

  //해당거래상세조회
  static async findDealDetail(dealId) {
    const dealDetail = await Deal.findDealByDealId(dealId);

    return dealDetail;
  }
}

export { dealService };
