import { db } from "../db";
import { v4 } from "uuid";

class Wallet {
  static async findWalletByUserId(userId) {
    const wallet = db.wallet.findMany({
      where: {
        userId,
      },
    });
    return wallet;
  }
}

export { Wallet };
