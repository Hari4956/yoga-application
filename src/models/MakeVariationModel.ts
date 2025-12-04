import mongoose from "mongoose";

import { MakeVariationDocument } from "../types/MakeVariationDocument";
const makeVariationSchema = new mongoose.Schema<MakeVariationDocument>(
  {
    variationName: { type: String, required: true },
    variationImage: { type: String, required: true },
    variationType: {
      type: [String],
      required: true,
      enum: ["Hand variations", "variations on legs", "other variations"],
    },
    english: { type: String, required: true },
    sanskrit: { type: String, required: true },
    exampleAsana: { type: String, required: true },
  },
  { timestamps: true }
);

const MakeVariationModel = mongoose.model<MakeVariationDocument>(
  "MakeVariation",
  makeVariationSchema
);

export default MakeVariationModel;
