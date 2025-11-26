import { Router } from "express";
import { asanaUpload } from "../middleware/upload";
import {
  createAsanaDetails,
  deleteAsanaDetails,
  getAllAsanasDetails,
  getAsanaByIdDetails,
  updateAsanaDetails,
} from "../controllers/AsanaDetails.controller";

const router = Router();

router.post("/", asanaUpload, createAsanaDetails);

// READ
router.get("/", getAllAsanasDetails);
router.get("/:id", getAsanaByIdDetails);

router.put("/:id", asanaUpload, updateAsanaDetails);

// DELETE
router.delete("/:id", deleteAsanaDetails);

export default router;
