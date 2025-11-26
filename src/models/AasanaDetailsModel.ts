import mongoose from "mongoose";
import { IAsanaDetails } from "../types/AasanaDetails.types";

const variationPoseSchema = new mongoose.Schema(
  {
    title: String,
    sanskrit: String,
    tamil: String,
    english: String,
    image: String, // ✔ FIXED
    poseType: String,
    level: String,
  },
  { _id: false }
);

const asanaDetailsSchema = new mongoose.Schema<IAsanaDetails>(
  {
    name: { type: String, required: true },
    sanskrit: { type: String, required: true },
    tamil: { type: String, required: true },
    english: { type: String, required: true },
    mainImage: { type: String, required: true },
    poseType: { type: String, required: true },
    level: { type: String, required: true },
    breath: { type: String, required: true },
    chakra: { type: String, required: true },
    howToDo: [String],
    benefits: [String],
    precautions: [String],
    variationPoses: [variationPoseSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IAsanaDetails>(
  "AsanaDetails",
  asanaDetailsSchema
);
