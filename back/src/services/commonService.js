const bcrypt = require("bcrypt");
const { db } = require("../db/db");
import { Common } from "../db/model/Common";
import { v4 } from "uuid";
class commonService {
  //
  static async getCurrencyInfo(countryCode) {
    return await Common.findCoinsIdByCountryCode(countryCode);
  }

  static async getAllCurrencyInfo() {
    return Common.findAllCoinsSlotByCountry();
  }

  static async getCountiesInfo(isHandled) {
    return await Common.findCountrys(isHandled);
  }
}
export { commonService };
