export interface IAsanaDetails {
  name: string;
  sanskrit: string;
  tamil: string;
  english: string;
  mainImage: string;
  poseType: string;
  level: string;
  breath: string;
  chakra: string;
  howToDo: string[];
  benefits: string[];
  precautions: string[];
  variationPoses: {
    title: string;
    sanskrit: string;
    tamil: string;
    english: string;
    image: String;
    poseType: string;
    level: string;
  }[];
}
