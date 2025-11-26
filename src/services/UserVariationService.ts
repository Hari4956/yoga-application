import UserVariationModel from "../models/UserVariationModel";
import {
  IAsanaVariation,
  ICreateVariationResponse,
} from "../types/UserVariation.types";

export const UserVariationService = {
  async createVariation(
    variationData: IAsanaVariation
  ): Promise<ICreateVariationResponse> {
    const existingVariation = await UserVariationModel.findOne({
      title: { $regex: new RegExp(`^${variationData.title}$`, "i") },
    });

    if (existingVariation) {
      return {
        alreadyExists: true,
        message: "Variation created successfully",
        variation: existingVariation,
      };
    }

    const variation = new UserVariationModel({
      ...variationData,
      status: "pending",
    });

    const saved = await variation.save();

    return {
      alreadyExists: false,
      variation: saved,
    };
  },

  async getAllVariatons(): Promise<IAsanaVariation[]> {
    return await UserVariationModel.find().sort({ createdAt: -1 });
  },

  async getVariationById(id: string): Promise<IAsanaVariation | null> {
    return await UserVariationModel.findById(id);
  },

  async updateVariation(
    id: string,
    variationData: Partial<IAsanaVariation>
  ): Promise<IAsanaVariation | null> {
    if (variationData.title) {
      const existing = await UserVariationModel.findOne({
        title: { $regex: new RegExp(`^${variationData.title}$`, "i") },
        _id: { $ne: id },
      });

      if (existing) {
        throw new Error("Another variation with this name already exists");
      }
    }

    return await UserVariationModel.findByIdAndUpdate(id, variationData, {
      new: true,
    });
  },

  async deleteVariation(id: string): Promise<IAsanaVariation | null> {
    return await UserVariationModel.findByIdAndDelete(id);
  },

  async approveVariation(id: string): Promise<IAsanaVariation | null> {
    return await UserVariationModel.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
  },

  async rejectVariation(id: string): Promise<IAsanaVariation | null> {
    return await UserVariationModel.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
  },
};
