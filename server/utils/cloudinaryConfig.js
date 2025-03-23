import {v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "chat-app",
      resource_type: "auto",
    }
})

const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Delete result:", result)
    } catch (err) {
        console.error("Error deleting image:", err)
    }
};

export  {cloudinary, storage, deleteImageFromCloudinary}