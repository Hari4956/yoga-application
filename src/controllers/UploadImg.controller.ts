import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinary.service";
import { uploadImgService } from "../services/UploadImgService";

export const uploadImgController = {
  async createUploadImg(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required",
        });
      }

      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file.path);

      // Save to DB using correct field "images"
      const result = await uploadImgService.create({
        images: imageUrl,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async getUploadImg(req: Request, res: Response) {
    try {
      const result = await uploadImgService.getAllUploadImg();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async getUploadImgById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await uploadImgService.getUploadImgById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async deleteUploadImg(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await uploadImgService.deleteUploadImg(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },
};
