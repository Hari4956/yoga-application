import UploadImgModel from "../models/UploadImgModel";
import { IUploadImg } from "../types/UploadImg.types";

export const uploadImgService = {
  async create(data: IUploadImg) {
    const uploadImg = await UploadImgModel.create(data);

    return {
      success: true,
      data: uploadImg,
    };
  },

  async getUploadImgById(id: string) {
    const uploadImg = await UploadImgModel.findById(id);

    if (!uploadImg) {
      return { success: false, message: "Image not found" };
    }

    return { success: true, data: uploadImg };
  },

  async getAllUploadImg() {
    const uploadImgs = await UploadImgModel.find();

    return { success: true, data: uploadImgs };
  },

  async deleteUploadImg(id: string) {
    const deleted = await UploadImgModel.findByIdAndDelete(id);

    if (!deleted) {
      return { success: false, message: "Image not found" };
    }

    return { success: true, data: deleted };
  },
};
