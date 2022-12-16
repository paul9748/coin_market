const bcrypt = require("bcrypt");
let PythonShell = require("python-shell");
import { Analysis } from "../db/model/Analysis";
class analysisService {
  static async analysis(img) {
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
      const objList = JSON.parse(data[0].replaceAll(`'`, `"`));
      let CoinList = await Analysis.findCoinList();
      let editData = {};
      for (let i of Object.keys(objList)) {
        if (i != "KRW") {
          editData[i] = [];
          for (let j of Object.keys(objList[i])) {
            editData[i].push({
              coinId: CoinList[i][j],
              dealAmount: objList[i][j],
            });
          }
        }
      }
      let setimg = "Detect_" + img;
      const resData = [editData, setimg];
      return resData;
    }
  }
}
export { analysisService };
