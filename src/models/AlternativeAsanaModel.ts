import mongoose from "mongoose";
import { IAlternativeAsana } from "../types/AlternativeAsana.types";

const AlternativeAsanaSchema = new mongoose.Schema<IAlternativeAsana>(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const AlternativeAsanaModel = mongoose.model<IAlternativeAsana>(
  "AlternativeAsana",
  AlternativeAsanaSchema
);

export default AlternativeAsanaModel;
