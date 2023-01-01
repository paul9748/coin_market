import { User } from "../db/model/User";
import { Address } from "../db/model/Address";

class addressService {
  //주소등록
  static async createAddress(userId, data) {
    data.userId = userId;

    const address = await Address.createAddress(data);

    return address;
  }

  //주소조회
  static async findAddresses(userId) {
    const addresses = await Address.findAddressesByUserId(userId);

    return addresses;
  }

  //주소수정
  static async updateAddress(userId, id, data) {
    const addresses = await Address.findAddressesByUserId(userId);

    if (addresses.filter((address) => address.id == id).length == 0) {
      throw new Error("해당 주소를 수정할 권한이 없습니다.");
    }

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
  static async defaultAddress(id, address) {
    if (address.isDefault == true) {
      address.isDefault = false;
    } else {
      address.isDefault = true;
    }

    const defaultAddress = await Address.defaultAddress(id, address.isDefault);

    return defaultAddress;
  }

  //주소삭제
  static async deleteAddress(id) {
    const deletedAddress = await Address.deleteAddress(id);

    return deletedAddress;
  }
}

export { addressService };
