import { db } from "../db";
import { v4 } from "uuid";

class Address {
  static async createAddress(data) {
    data.id = v4();
    const address = db.address.create({
      data,
    });
    return address;
  }

  static async findAddressesByUserId(userId) {
    const addresses = db.address.findMany({
      where: {
        user_id: userId,
      },
    });
    return addresses;
  }

  static async updateAddressById({
    id,
    addressName,
    name,
    phoneNumber,
    postalCode,
    address1,
    address2,
    isDefault,
  }) {
    const address = db.address.update({
      where: {
        id,
      },
      data: {
        id,
        addressName,
        name,
        phoneNumber,
        postalCode,
        address1,
        address2,
        isDefault,
      },
    });
    return address;
  }

  static async defaultAddress(id) {
    const defaultAddress = db.address.update({
      where: {
        id,
      },
      data: {
        isDefault: true,
      },
    });
    return defaultAddress;
  }

  static async deleteAddress(id) {
    const deletedAddress = db.address.delete({
      where: {
        id,
      },
    });

    return deletedAddress;
  }
}

export { Address };
