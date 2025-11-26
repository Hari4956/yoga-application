import express from "express";
import { variationUpload } from "../middleware/upload";
import { UserVariationController } from "../controllers/UserVariation.controller";
import { AdminAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", variationUpload, UserVariationController.createVaration);
router.get("/", UserVariationController.getVariation);

router.put("/approve/:id", AdminAuth, UserVariationController.approveVariation);

router.put("/reject/:id", AdminAuth, UserVariationController.rejectVariation);

router.get("/:id", UserVariationController.getVariationById);
router.put("/:id", variationUpload, UserVariationController.updateVariation);
router.delete("/:id", UserVariationController.deleteVariation);

export default router;
