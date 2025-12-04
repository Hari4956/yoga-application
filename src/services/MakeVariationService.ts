import MakeVariationModel from "../models/MakeVariationModel";
import { MakeVariationDocument } from "../types/MakeVariationDocument";

export const MakeVariationService = {
  async createMakeVariation(
    variationData: MakeVariationDocument
  ): Promise<MakeVariationDocument> {
    try {
      const existingVariation = await MakeVariationModel.findOne({
        variationName: {
          $regex: new RegExp(`^${variationData.variationName}$`, "i"),
        },
      });

      if (existingVariation) {
        throw new Error("Variation already exists");
      }

      const variation = new MakeVariationModel({ ...variationData });
      return await variation.save();
    } catch (error: any) {
      throw new Error("Error creating make variation: " + error.message);
    }
  },

  async getAllVariations(): Promise<MakeVariationDocument[]> {
    try {
      return await MakeVariationModel.find();
    } catch (error: any) {
      throw new Error("Error getting variations: " + error.message);
    }
  },

  async getVariationById(id: string): Promise<MakeVariationDocument | null> {
    try {
      return await MakeVariationModel.findById(id);
    } catch (error: any) {
      throw new Error("Error getting variation by ID: " + error.message);
    }
  },

  async updateVariation(
    id: string,
    updateData: Partial<MakeVariationDocument>
  ): Promise<MakeVariationDocument | null> {
    try {
      const updated = await MakeVariationModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return updated
    } catch (error: any) {
      throw new Error("Error updating variation: " + error.message);
    }
  },

  async deleteVariation(id: string): Promise<void> {
    try {
      await MakeVariationModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error("Error deleting variation: " + error.message);
    }
  },
};
