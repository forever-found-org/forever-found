import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "forever-found",
      format: file.mimetype.split("/")[1], // jpg, png
    };
  },
});

const cloudUpload = multer({ storage });

export default cloudUpload;
