import AasanaDetailsModel from "../models/AasanaDetailsModel";
import { IAsanaDetails } from "../types/AasanaDetails.types";

export const createAsanaService = async (data: any) => {
  const existing = await AasanaDetailsModel.findOne({
    name: { $regex: new RegExp(`^${data.name}$`, "i") },
  });

  if (existing) {
    return { alreadyExists: true, asana: existing };
  }

  const newAsana = await AasanaDetailsModel.create(data);
  return { alreadyExists: false, asana: newAsana };
};

export const getAllAsanasService = async () => {
  return await AasanaDetailsModel.find().sort({ createdAt: -1 });
};

export const getAsanaByIdService = async (id: string) => {
  return await AasanaDetailsModel.findById(id);
};

export const updateAsanaService = async (
  id: string,
  data: Partial<IAsanaDetails>
) => {
  const existingAsana = await AasanaDetailsModel.findOne({
    name: { $regex: new RegExp(`^${data.name}$`, "i") },
    _id: { $ne: id },
  });

  if (existingAsana) {
    throw new Error("Another asana with this name already exists");
  }

  return await AasanaDetailsModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAsanaService = async (id: string) => {
  return await AasanaDetailsModel.findByIdAndDelete(id);
};
