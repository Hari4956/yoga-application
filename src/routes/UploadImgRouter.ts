import express from "express";
import { uploadImgController } from "../controllers/UploadImg.controller";
import { uploadImage } from "../middleware/upload";

const router = express.Router();

router.post("/", uploadImage, uploadImgController.createUploadImg);
router.delete("/:id", uploadImgController.deleteUploadImg);

export default router;
