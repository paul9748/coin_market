import { Deal } from "../db/model/Deal";

class dealService {
  //상태별deal or deal 전체 조회
  static async findDealByStatus(status) {
    const dealListByStatus = await Deal.findDealByStatus(status);

    return dealListByStatus;
  }

  static async findDealByResStatus(resStatus) {
    const dealListByResStatus = await Deal.findDealByDeliveryStatus(resStatus);

    return dealListByResStatus;
  }

  //해당거래상세조회
  static async findDealDetail(dealId) {
    const dealDetail = await Deal.findDealByDealId(dealId);

    return dealDetail;
  }
}

export { dealService };
