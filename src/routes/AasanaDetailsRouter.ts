import { Router } from "express";
import upload from "../middleware/upload";
import {
  createAsanaDetails,
  deleteAsanaDetails,
  getAllAsanasDetails,
  getAsanaByIdDetails,
  updateAsanaDetails,
} from "../controllers/AsanaDetails.controller";

const router = Router();

router.post("/", upload.single("mainImage"), createAsanaDetails);
router.get("/", getAllAsanasDetails);
router.get("/:id", getAsanaByIdDetails);
router.put("/:id", upload.single("mainImage"), updateAsanaDetails);
router.delete("/:id", deleteAsanaDetails);

export default router;
