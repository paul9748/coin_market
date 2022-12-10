import { Wallet } from "../db/model/Wallet";

class walletService {
  //잔액 조회
  static async checkChanges(userId) {
    const changes = await Wallet.findWalletByUserId(userId);
    return changes;
  }
}

export { walletService };
