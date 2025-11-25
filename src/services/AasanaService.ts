import AasanaModel from "../models/AasanaModel";
import { IAasana } from "../types/Aasana.types";

export const aasanaService = {
  async createAasana(Asanadata: IAasana): Promise<{
    exists: boolean;
    data: IAasana | null;
    message: string;
  }> {
    try {
      const existingAasana = await AasanaModel.findOne({
        name: Asanadata.name,
      });

      if (existingAasana) {
        return {
          exists: true,
          data: null,
          message: "Aasana already exists",
        };
      }

      const aasana = new AasanaModel({
        name: Asanadata.name,
        levels: Asanadata.levels,
        poseType: Asanadata.poseType,
      });

      await aasana.save();

      return {
        exists: false,
        data: aasana,
        message: "Aasana created successfully",
      };
    } catch (error) {
      throw new Error(
        `Failed to create Aasana: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  async getAllAasanas(filters: any): Promise<IAasana[]> {
    try {
      const aasanas = await AasanaModel.find(filters);
      return aasanas;
    } catch (error) {
      throw new Error(
        `Failed to retrieve Aasanas: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  async getAasanaById(id: string): Promise<IAasana> {
    try {
      const aasana = await AasanaModel.findById(id);
      if (!aasana) {
        throw new Error("Aasana not found");
      }
      return aasana;
    } catch (error) {
      throw new Error(
        `Failed to retrieve Aasana: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  async updateAasana(
    id: string,
    updateData: Partial<IAasana>
  ): Promise<IAasana> {
    try {
      const updatedAasana = await AasanaModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedAasana) {
        throw new Error("Aasana not found");
      }
      return updatedAasana;
    } catch (error) {
      throw new Error(
        `Failed to update Aasana: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  async deleteAasana(id: string): Promise<IAasana> {
    try {
      const deletedAasana = await AasanaModel.findByIdAndDelete(id);
      if (!deletedAasana) {
        throw new Error("Aasana not found");
      }
      return deletedAasana;
    } catch (error) {
      throw Error(
        `Failed to delete Aasana: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },
};
