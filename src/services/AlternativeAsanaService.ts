import AlternativeAsanaModel from "../models/AlternativeAsanaModel";
import { IAlternativeAsana } from "../types/AlternativeAsana.types";

export const alternativeAsanaService = {
  async createAlternativeAsana(data: IAlternativeAsana) {
    if (!data?.content) {
      return { success: false, message: "Content is required" };
    }

    const existing = await AlternativeAsanaModel.findOne({
      content: { $regex: new RegExp(`^${data.content}$`, "i") },
    });

    if (existing) {
      return {
        success: true,
        alreadyExists: true,
        data: existing,
      };
    }

    const newAlternativeAsana = await AlternativeAsanaModel.create(data);

    return {
      success: true,
      alreadyExists: false,
      data: newAlternativeAsana,
    };
  },

  async getAlternativeAsanaById(id: string) {
    const alternativeAsana = await AlternativeAsanaModel.findById(id);

    if (!alternativeAsana) {
      return { success: false, message: "Alternative Asana not found" };
    }

    return { success: true, data: alternativeAsana };
  },

  async getAllAlternativeAsana() {
    const alternativeAsanas = await AlternativeAsanaModel.find();

    return {
      success: true,
      data: alternativeAsanas,
    };
  },

  async deleteAlternativeAsana(id: string) {
    const deleted = await AlternativeAsanaModel.findByIdAndDelete(id);

    if (!deleted) {
      return { success: false, message: "Alternative Asana not found" };
    }

    return { success: true, deleted };
  },

  async updateAlternativeAsana(id: string, data: IAlternativeAsana) {
    const updated = await AlternativeAsanaModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, message: "Alternative Asana not found" };
    }

    return { success: true, data: updated };
  },
};
