import { aasanaService } from "../services/AasanaService";
import { Request, Response } from "express";

export const aasanaController = {
  async createAasana(req: Request, res: Response): Promise<void> {
    try {
      const { name, poseType, levels } = req.body;

      if (!name || !poseType || !levels) {
        res.status(400).json({
          success: false,
          error: "All fields are required",
        });
        return;
      }

      const result = await aasanaService.createAasana({
        name,
        poseType,
        levels,
      });

      if (result.exists) {
        res.status(200).json({
          success: true,
          message: result.message, // "Aasana already exists"
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: "Aasana created successfully",
        data: result.data,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  async getAllAasana(req: Request, res: Response): Promise<void> {
    try {
      const { search, levels, poseType } = req.query;

      const filters: any = {};

      if (search) {
        filters.name = { $regex: search as string, $options: "i" };
      }

      if (levels) {
        filters.levels = levels;
      }

      if (poseType) {
        filters.poseType = poseType;
      }

      const aasanas = await aasanaService.getAllAasanas(filters);

      res.status(200).json({
        success: true,
        data: aasanas,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        success: false,
        error: err.message,
        message: "Failed to retrieve Aasanas",
      });
    }
  },

  async getAasanaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const aasana = await aasanaService.getAasanaById(id);
      res.status(200).json({
        success: true,
        data: aasana,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        error: err.message,
        message: "Failed to retrieve Aasana",
      });
    }
  },

  async updateAasana(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, poseType, levels } = req.body;
      const aasana = await aasanaService.updateAasana(id, {
        name,
        poseType,
        levels,
      });
      res.status(200).json({
        success: true,
        data: aasana,
        message: "Aasana updated successfully",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        error: err.message,
        message: "Failed to update Aasana",
      });
    }
  },

  async deleteAasana(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await aasanaService.deleteAasana(id);
      res.status(200).json({
        success: true,
        message: "Aasana deleted successfully",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        error: err.message,
        message: "Failed to delete Aasana",
      });
    }
  },
};
