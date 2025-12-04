import mongoose from "mongoose";

export interface MakeVariationDocument {
  _id: mongoose.Types.ObjectId;
  variationName: string;
  variationImage: string;
  variationType: VariationTypeEnum[];
  english: string;
  sanskrit: string;
  exampleAsana: string;
}

export enum VariationTypeEnum {
  HandVariatons = "Hand variations",
  LegsVariatons = "variations on legs",
  OtherVariatons = "other variations",
}

export interface variationNameId {
  _id: mongoose.Types.ObjectId;
  variationName: string;
  variationType: VariationTypeEnum[];
}
