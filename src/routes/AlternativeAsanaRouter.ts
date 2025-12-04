import express from "express";
import { alternativeAsanaController } from "../controllers/AlternativeAsana.controller";
import { AdminAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", AdminAuth, alternativeAsanaController.createAlternativeAsana);
router.get("/", alternativeAsanaController.getAllAlternativeAsana);
router.get(
  "/:id",
  AdminAuth,
  alternativeAsanaController.getAlternativeAsanaById
);
router.put(
  "/:id",
  AdminAuth,
  alternativeAsanaController.updateAlternativeAsana
);
router.delete(
  "/:id",
  AdminAuth,
  alternativeAsanaController.deleteAlternativeAsana
);

export default router;
