export interface IAsanaVariation {
  title: string;
  sanskrit: string;
  tamil: string;
  english: string;
  image: string;
  poseType: string;
  level: string;
}

export interface ICreateVariationResponse {
  alreadyExists?: boolean;
  variation: IAsanaVariation;
  message?: string;
}
