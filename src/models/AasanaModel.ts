import mongoose from "mongoose";
import { IAasana } from "../types/Aasana.types";

const aasanaSchema = new mongoose.Schema<IAasana>(
  {
    name: { type: String, required: true },

    levels: {
      type: String,
      enum: ["all levels", "beginner", "intermediate", "advanced"],
      default: "all levels",
      required: true,
    },

    poseType: {
      type: String,
      enum: ["all pose types", "standing", "seated"],
      default: "all pose types",
      required: true,
    },
  },
  { timestamps: true }
);

const AasanaModel = mongoose.model<IAasana>("Aasana", aasanaSchema);

export default AasanaModel;
