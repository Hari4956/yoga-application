import { Request, Response } from "express";
import { UserVariationService } from "../services/UserVariationService";
import { IAsanaVariation } from "../types/UserVariation.types";
import { uploadToCloudinary } from "../services/cloudinary.service";

export const UserVariationController = {
  async createVaration(req: Request, res: Response) {
    try {
      const { parentAsana, poseType } = req.body;

      // Validate parentAsana
      if (!parentAsana) {
        return res.status(400).json({
          success: false,
          message: "parentAsana is required",
        });
      }

      // Parse poseType safely
      let parsedPoseType: string[] = [];
      if (Array.isArray(poseType)) {
        parsedPoseType = poseType;
      } else if (typeof poseType === "string" && poseType.length > 0) {
        parsedPoseType = poseType.split(",").map((s) => s.trim());
      }

      // Upload image if exists
      const imageUrl = req.file ? await uploadToCloudinary(req.file.path) : "";

      const variationData: IAsanaVariation = {
        ...req.body,
        poseType: parsedPoseType,
        image: imageUrl,
        parentAsana,
      };

      const result = await UserVariationService.createVariation(variationData);

      return res.json({ success: true, ...result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },
  async getVariation(req: Request, res: Response) {
    try {
      const result = await UserVariationService.getAllVariatons();
      return res.json({ success: true, ...result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async getVariationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserVariationService.getVariationById(id);
      return res.json({ success: true, variation: result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async updateVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let imageUrl = req.body.image;

      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file.path);
      }

      const updateData = {
        ...req.body,
        image: imageUrl,
      };

      const updated = await UserVariationService.updateVariation(
        id,
        updateData
      );

      return res.json({
        success: true,
        updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async deleteVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserVariationService.deleteVariation(id);
      return res.json({ success: true, ...result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async approveVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await UserVariationService.approveVariation(id);
      return res.json({
        success: true,
        message: "Variation Approved",
        updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async rejectVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await UserVariationService.rejectVariation(id);
      return res.json({
        success: true,
        message: "Variation Rejected",
        updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },
};
