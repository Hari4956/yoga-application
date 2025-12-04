import mongoose from "mongoose";

export interface IAlternativeAsana {
  _id: mongoose.Types.ObjectId;
  content: string;
}
