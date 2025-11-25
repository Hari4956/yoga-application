import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

console.log(" name", process.env.CLOUDINARY_NAME);
console.log(" API key", process.env.CLOUDINARY_API_KEY);
console.log(" API secretD", process.env.CLOUDINARY_API_SECRET);

export const uploadToCloudinary = async (filePath: string) => {
  try {
    console.log("Uploading File:", filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "asana-images",
      resource_type: "auto",
    });

    console.log("Cloudinary Upload Success:", result.secure_url);
    return result.secure_url;
  } catch (error: any) {
    console.log("Cloudinary Error:", error);
    throw new Error(error.message || "Cloudinary upload failed");
  }
};
