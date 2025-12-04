import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinary.service";
import {
  createAsanaService,
  getAllAsanasService,
  getAsanaByIdService,
  updateAsanaService,
  deleteAsanaService,
} from "../services/AsanaDetailsService";
import UserVariationModel from "../models/UserVariationModel";

const safeJSON = (value: any, fieldName: string) => {
  if (!value) return [];

  // If already parsed (not a string), return as is.
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.log(`❌ JSON PARSE ERROR in field "${fieldName}":`, value);
    return []; // fallback so API never crashes on invalid JSON
  }
};

export const createAsanaDetails = async (req: Request, res: Response) => {
  try {
    let mainImageUrl = "";
    let variationPoseImagesUrls: string[] = [];

    console.log("CREATE REQ FILES:", req.files);
    console.log("CREATE REQ BODY:", req.body);

    // console.log("REQ FILES:", req.files);
    // console.log("REQ BODY:", req.body);

    if (req.files && (req.files as any).mainImage) {
      const file = (req.files as any).mainImage[0];
      mainImageUrl = await uploadToCloudinary(file.path);
    }

    if (req.files && (req.files as any).images) {
      const files = (req.files as any).images;
      for (let file of files) {
        console.log("Uploading variation image:", file.path); // ADD THIS
        const url = await uploadToCloudinary(file.path);
        console.log("Variation image uploaded:", url); // ADD THIS
        variationPoseImagesUrls.push(url);
      }
    }

    // USE SAFE PARSER
    const variationPoses = safeJSON(req.body.variationPoses, "variationPoses");
    const howToDo = safeJSON(req.body.howToDo, "howToDo");
    const benefits = safeJSON(req.body.benefits, "benefits");
    const precautions = safeJSON(req.body.precautions, "precautions");

    // Attach uploaded images to variation poses
    if (Array.isArray(variationPoses)) {
      variationPoses.forEach((pose: any, index: number) => {
        pose.image = variationPoseImagesUrls[index] || "";
      });
    }

    const data = {
      ...req.body,
      howToDo,
      benefits,
      precautions,
      variationPoses,
      mainImage: mainImageUrl,
    };

    const result = await createAsanaService(data);

    return res.status(201).json({
      success: true,
      asana: result.asana,
      message: result.alreadyExists
        ? "Asana already exists"
        : "Asana created successfully",
    });
  } catch (error: any) {
    console.log("CREATE ASANA ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating asana",
      error: error.message,
    });
  }
};

export const getAllAsanasDetails = async (req: Request, res: Response) => {
  try {
    const { name = "", level = "", poseType = "" } = req.query;

    const filters = {
      name: name as string,
      level: level as string,
      poseType: poseType as string,
    };

    const asanas = await getAllAsanasService(filters);

    res.json({ success: true, asanas });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching Asanas",
      error: error.message,
    });
  }
};

export const getAsanaByIdDetails = async (req: Request, res: Response) => {
  try {
    const asanaId = req.params.id;

    // 1️⃣ Fetch asana details
    const asana = await getAsanaByIdService(asanaId);

    if (!asana) {
      return res.status(404).json({
        success: false,
        message: "Asana not found",
      });
    }

    const variations = await UserVariationModel.find({
      parentAsana: asanaId,
      status: "approved",
    });

    return res.json({
      success: true,
      asana,
      variationPoses: variations,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAsanaDetails = async (req: Request, res: Response) => {
  try {
    let mainImageUrl = req.body.mainImage;

    // If new main image uploaded
    if (req.files && (req.files as any).mainImage) {
      const file = (req.files as any).mainImage[0];
      mainImageUrl = await uploadToCloudinary(file.path);
    }

    // Variation images upload
    let variationPoseImagesUrls: string[] = [];

    if (req.files && (req.files as any).images) {
      const files = (req.files as any).images;
      for (let file of files) {
        const url = await uploadToCloudinary(file.path);
        variationPoseImagesUrls.push(url);
      }
    }

    // Safe JSON parser
    const safeJSON = (value: any) => {
      try {
        return JSON.parse(value || "[]");
      } catch {
        return [];
      }
    };

    const variationPoses = safeJSON(req.body.variationPoses);
    const benefits = safeJSON(req.body.benefits);
    const precautions = safeJSON(req.body.precautions);
    const howToDo = safeJSON(req.body.howToDo);

    // Attach uploaded variation images
    if (Array.isArray(variationPoses)) {
      variationPoses.forEach((pose: any, index: number) => {
        if (variationPoseImagesUrls[index]) {
          pose.image = variationPoseImagesUrls[index];
        }
      });
    }

    const data = {
      ...req.body,
      mainImage: mainImageUrl,
      howToDo,
      benefits,
      precautions,
      variationPoses,
    };

    const updated = await updateAsanaService(req.params.id, data);

    res.json({ success: true, updated });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error updating asana",
      error: (error as any).message || error,
    });
  }
};

export const deleteAsanaDetails = async (req: Request, res: Response) => {
  await deleteAsanaService(req.params.id);
  res.json({ success: true, message: "Asana deleted" });
};
