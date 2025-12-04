import AasanaDetailsModel from "../models/AasanaDetailsModel";
import { IAsanaDetails, IAsanaGetAll } from "../types/AasanaDetails.types";

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

export const getAllAsanasService = async (filters: {
  name: string;
  level: string;
  poseType: string;
}): Promise<IAsanaGetAll[]> => {
  const query: any = {};

  // Name search (case-insensitive)
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  // Level search (case-insensitive exact match)
  if (filters.level) {
    query.level = { $regex: `^${filters.level}$`, $options: "i" };
  }

  // PoseType search (case-insensitive)
  if (filters.poseType) {
    query.poseType = { $regex: filters.poseType, $options: "i" };
  }

  const asanas = await AasanaDetailsModel.find(query)
    .sort({ createdAt: -1 })
    .select("name level poseType")
    .lean();

  return asanas.map((asana) => ({
    _id: asana._id.toString(),
    name: asana.name,
    level: asana.level,
    poseType:
      typeof asana.poseType === "string"
        ? asana.poseType.split(",").map((t) => t.trim())
        : Array.isArray(asana.poseType)
        ? asana.poseType
        : [],
  }));
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
