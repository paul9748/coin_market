import { Router } from "express";
import { analysisService } from "../services/analysisService";
import { upload } from "../middlewares/imageUpload";
const analysisRouter = Router();
analysisRouter.put(
  "/analysis",
  upload.single("img"),
  async (req, res, next) => {
    try {
      const { path, filename } = req.file;
      res.json(filename);
    } catch (err) {
      next(err);
    }
  }
);
analysisRouter.post("/analysis", async (req, res, next) => {
  try {
    const data = req.body["img"];
    let user = await analysisService.analysis(data);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { analysisRouter };
