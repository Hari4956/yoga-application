import mongoose from "mongoose";
import { IUploadImg } from "../types/UploadImg.types";

const uploadImgSchema = new mongoose.Schema<IUploadImg>(
  {
    images: { type: String, required: true },
  },
  { timestamps: true }
);

const UploadImgModel = mongoose.model<IUploadImg>("UploadImg", uploadImgSchema);

export default UploadImgModel;
