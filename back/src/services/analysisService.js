const bcrypt = require("bcrypt");
const { db } = require("../db/db");
let PythonShell = require("python-shell");
import { v4 } from "uuid";

class analysisService {
  static async analyses(img) {
    let { PythonShell } = require("python-shell");
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: [img],
    };
    const pythonFunction = () => {
      return new Promise((data) => {
        PythonShell.run(
          "./src/yolo/analysis.py",
          options,
          function (err, results) {
            if (err) {
              data({ status: 502, Error: err });
            } else {
              data(results);
            }
          }
        );
      });
    };
    const data = await pythonFunction();

    if (data.Error) {
      throw new Error(data);
    } else {
      const objList = JSON.parse(data[1].replaceAll(`'`, `"`));
      console.log(objList);
      return objList;
    }
  }
}
export { analysisService };
