import mongoose from "mongoose";
import { IAsanaVariation } from "../types/UserVariation.types";

const userVariationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sanskrit: { type: String, required: true },
    tamil: { type: String, required: true },
    english: { type: String, required: true },
    image: { type: String, required: true },
    poseType: { type: String, required: true },
    level: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const UserVariationModel = mongoose.model<IAsanaVariation>(
  "UserVariation",
  userVariationSchema
);

export default UserVariationModel;
