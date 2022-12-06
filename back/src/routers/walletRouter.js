import { Router } from "express";
import { walletService } from "../services/walletService";
import { loginRequired } from "../middlewares/loginRequired";

const walletRouter = Router();

//잔액 조회
walletRouter.get("/users/wallet", loginRequired, async (req, res, next) => {
  try {
    const wallet = await walletService.checkChanges(req.userId);
    wallet.sort(function (a, b) {
      if (a.expirationDate > b.expirationDate) {
        return -1;
      } else if (a.expirationDate < b.expirationDate) {
        return 1;
      } else {
        return 0;
      }
    });
    res.status(200).json(wallet[0]);
  } catch (err) {
    next(err);
  }
});

export { walletRouter };
