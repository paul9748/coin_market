import { db } from "../db";
import { v4 } from "uuid";

class Wallet {
  static async createWallet(data) {
    data.id = v4();
    const wallet = db.wallet.create({
      data,
    });
    return wallet;
  }

  static async findWalletByUserId(id) {
    const wallet = db.wallet.findUnique({
      where: {
        id,
      },
    });
    return wallet;
  }
}

export { Wallet };
