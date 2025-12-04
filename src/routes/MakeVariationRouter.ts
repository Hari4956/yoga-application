import express from "express";
import { MakeVariationController } from "../controllers/MakeVariationController";
import { makeVariationUpload } from "../middleware/upload";

const router = express.Router();

router.post("/", makeVariationUpload, MakeVariationController.createVariation);
router.get("/names", MakeVariationController.getMakeVariationNames);
router.get("/", MakeVariationController.getAllVariations);
router.get("/:id", MakeVariationController.getVariationById);
router.put(
  "/:id",
  makeVariationUpload,
  MakeVariationController.updateVariation
);
router.delete("/:id", MakeVariationController.deleteVariation);

export default router;
