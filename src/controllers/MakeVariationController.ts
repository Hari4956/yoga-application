import { Request, Response } from "express";
import { MakeVariationService } from "../services/MakeVariationService";
import { validateVariationData } from "../Validation/makeVariation.validation";
import { uploadToCloudinary } from "../services/cloudinary.service";
import MakeVariationModel from "../models/MakeVariationModel";
import { variationNameId } from "../types/MakeVariationDocument";

export const MakeVariationController = {
  async createVariation(req: Request, res: Response) {
    try {
      if (typeof req.body.variationType === "string") {
        try {
          req.body.variationType = JSON.parse(req.body.variationType);
        } catch {
          req.body.variationType = [req.body.variationType];
        }
      }

      const errors = validateVariationData(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      const imageUrl = req.file ? await uploadToCloudinary(req.file.path) : "";
      req.body.variationImage = imageUrl;

      const saved = await MakeVariationService.createMakeVariation(req.body);

      return res.status(201).json({
        message: "Variation created successfully",
        data: saved,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Error creating variation",
      });
    }
  },

  async getAllVariations(req: Request, res: Response) {
    try {
      const variations = await MakeVariationService.getAllVariations();
      return res.status(200).json(variations);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Error fetching variations",
      });
    }
  },

  async getVariationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const variation = await MakeVariationService.getVariationById(id);

      if (!variation) {
        return res.status(404).json({ message: "Variation not found" });
      }

      return res.status(200).json(variation);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Error fetching variation by ID",
      });
    }
  },

  async updateVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await MakeVariationService.updateVariation(id, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Variation not found" });
      }

      return res.status(200).json({
        message: "Variation updated successfully",
        data: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Error updating variation",
      });
    }
  },

  async deleteVariation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await MakeVariationService.deleteVariation(id);

      return res.status(200).json({
        message: "Variation deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Error deleting variation",
      });
    }
  },

  async getMakeVariationNames(req: Request, res: Response) {
    try {
      const variations = await MakeVariationModel.find<variationNameId>({})
        .select("_id variationName variationType")
        .lean()
        .exec();

      return res.status(200).json({
        message: "Variation names fetched successfully",
        data: variations,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Error fetching variations",
      });
    }
  },
};
