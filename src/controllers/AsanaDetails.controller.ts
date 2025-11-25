import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinary.service";
import {
  createAsanaService,
  getAllAsanasService,
  getAsanaByIdService,
  updateAsanaService,
  deleteAsanaService,
} from "../services/AsanaDetailsService";

export const createAsanaDetails = async (req: Request, res: Response) => {
  try {
    let mainImageUrl = "";

    if (req.file) {
      mainImageUrl = await uploadToCloudinary(req.file.path);
    }

    const data = {
      ...req.body,
      mainImage: mainImageUrl,
      variationPoses: JSON.parse(req.body.variationPoses || "[]"),
      benefits: JSON.parse(req.body.benefits || "[]"),
      precautions: JSON.parse(req.body.precautions || "[]"),
    };

    const result = await createAsanaService(data);

    // if already exists, return it instead of error
    if (result.alreadyExists) {
      return res.status(200).json({
        success: true,
        message: "Asana already exists",
        // asana: result.asana,
      });
    }

    // new asana created
    return res.status(201).json({
      success: true,
      message: "Asana created successfully",
      asana: result.asana,
    });
  } catch (error: any) {
    console.log("CREATE ASANA ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error creating asana",
      error: error.message,
    });
  }
};

export const getAllAsanasDetails = async (_: Request, res: Response) => {
  const asanas = await getAllAsanasService();
  res.json({ success: true, asanas });
};

export const getAsanaByIdDetails = async (req: Request, res: Response) => {
  const asana = await getAsanaByIdService(req.params.id);
  res.json({ success: true, asana });
};

export const updateAsanaDetails = async (req: Request, res: Response) => {
  try {
    let mainImageUrl = req.body.mainImage;

    if (req.file) {
      mainImageUrl = await uploadToCloudinary(req.file.path);
    }

    const data = {
      ...req.body,
      mainImage: mainImageUrl,
      variationPoses: JSON.parse(req.body.variationPoses || "[]"),
      benefits: JSON.parse(req.body.benefits || "[]"),
      precautions: JSON.parse(req.body.precautions || "[]"),
    };

    const updated = await updateAsanaService(req.params.id, data);
    res.json({ success: true, updated });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating asana", error });
  }
};

export const deleteAsanaDetails = async (req: Request, res: Response) => {
  await deleteAsanaService(req.params.id);
  res.json({ success: true, message: "Asana deleted" });
};
