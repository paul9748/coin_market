import { Router } from "express";
import { addressService } from "../services/addressService";
import { loginRequired } from "../middlewares/loginRequired";

const addressRouter = Router();

//주소등록
addressRouter.post(
  "/users/addresses",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.userId;
      const data = req.body;

      const address = await addressService.createAddress(userId, data);

      res.status(201).json(address);
    } catch (err) {
      next(err);
    }
  }
);

//주소조회
addressRouter.get("/users/addresses", loginRequired, async (req, res, next) => {
  try {
    const addresses = await addressService.findAddresses(req.userId);

    res.status(200).json(addresses);
  } catch (err) {
    next(err);
  }
});

//주소수정
addressRouter.put("/users/addresses/:addressId", async (req, res, next) => {
  try {
    const id = req.params.addressId;
    const data = req.body;

    const updatedAddress = await addressService.updateAddress(id, data);

    res.status(201).json(updatedAddress);
  } catch (err) {
    next(err);
  }
});

//주소 기본배송지 설정
addressRouter.put(
  "/users/addresses/default/:addressId",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.userId;
      const id = req.params.addressId;

      const defaultAddress = await addressService.defaultAddress(userId, id);

      res.status(201).json(defaultAddress);
    } catch (err) {
      next(err);
    }
  }
);

//주소삭제
addressRouter.delete("/users/addresses/:addressId", async (req, res, next) => {
  try {
    const id = req.params.addressId;

    const deletedAddress = await addressService.deleteAddress(id);

    res.status(204).send("삭제가 완료되었습니다.");
  } catch (err) {
    next(err);
  }
});

export { addressRouter };
