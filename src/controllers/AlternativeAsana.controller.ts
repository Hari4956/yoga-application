import { Request, Response } from "express";
import { alternativeAsanaService } from "../services/AlternativeAsanaService";

export const alternativeAsanaController = {
  // CREATE
  async createAlternativeAsana(req: Request, res: Response) {
    try {
      const result = await alternativeAsanaService.createAlternativeAsana(
        req.body
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      if (result.alreadyExists) {
        return res.status(409).json({
          success: false,
          message: "Alternative Asana already exists",
          alternativeAsana: result.data,
        });
      }

      return res.status(201).json({
        success: true,
        alternativeAsana: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async getAlternativeAsanaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await alternativeAsanaService.getAlternativeAsanaById(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async getAllAlternativeAsana(req: Request, res: Response) {
    try {
      const result = await alternativeAsanaService.getAllAlternativeAsana();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async deleteAlternativeAsana(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await alternativeAsanaService.deleteAlternativeAsana(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },

  async updateAlternativeAsana(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await alternativeAsanaService.updateAlternativeAsana(
        id,
        req.body
      );

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  },
};
