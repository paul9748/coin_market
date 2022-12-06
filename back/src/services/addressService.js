import { User } from "../db/model/User";
import { Address } from "../db/model/Address";

class addressService {
  //주소등록
  static async createAddress(userId, data) {
    const user = await User.findUserById(userId);
    if (!user) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    data.userId = userId;

    const address = await Address.createAddress(data);

    return address;
  }

  //주소조회
  static async findAddresses(userId) {
    const addresses = await Address.findAddressesByUserId(userId);

    if (!addresses) {
      throw new Error("주소가 존재하지 않습니다.");
    }

    return addresses;
  }

  //주소수정
  static async updateAddress(id, data) {
    const addressName = data.addressName;
    const name = data.name;
    const phoneNumber = data.phoneNumber;
    const postalCode = data.postalCode;
    const address1 = data.address1;
    const address2 = data.address2;
    const isDefault = data.isDefault;

    const updatedAddress = await Address.updateAddressById({
      id,
      addressName,
      name,
      phoneNumber,
      postalCode,
      address1,
      address2,
      isDefault,
    });

    return updatedAddress;
  }

  //주소 기본배송지 설정
  static async defaultAddress(userId, id) {
    const findAddress = await Address.findAddressesByUserId(userId);
    // 주소 리스트에서 디폴트 1인값 걸러줘야함
    console.log(findAddress);
    // if (findAddress.filter({isDefault : true})) {

    // }
    // const defaultAddress = await Address.defaultAddress(id);

    return defaultAddress;
  }

  //주소삭제
  static async deleteAddress(id) {
    const deletedAddress = await Address.deleteAddress(id);

    return deletedAddress;
  }
}

export { addressService };
