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
        PythonShell.run("./src/test.py", options, function (err, results) {
          if (err) throw err;
          console.log("results: %j", results);
          data(results);
        });
      });
    };
    const data = await pythonFunction();
    return data;
  }
}
export { analysisService };
