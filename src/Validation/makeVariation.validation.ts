import { VariationTypeEnum } from "../types/MakeVariationDocument";

export const validateVariationData = (data: any) => {
  const errors: string[] = [];

  // Convert enum values to string[]
  const allowedValues = Object.values(VariationTypeEnum) as string[];

  if (!Array.isArray(data.variationType)) {
    errors.push("variationType must be an array.");
  } else {
    data.variationType.forEach((value: string) => {
      if (!allowedValues.includes(value)) {
        errors.push(`Invalid variationType value: ${value}`);
      }
    });
  }

  return errors;
};
