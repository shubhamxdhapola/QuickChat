import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary"
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const profilePhotosStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "QuickChat_Profile_Photos",
      public_id: (req, file) => file.originalname.replace(/\s+/g, '_')
    }
})

const chatFilesStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const fileExtension = file.originalname.split('.').pop()
        const fileName = file.originalname.replace(/\s+/g, '_')

        return {
          folder: "QuickChat_Chat_Files",
          resource_type: fileExtension === 'pdf' || 'mp3' ? "raw" : "auto",
          public_id: fileName
        }
    }
})

const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Delete result:", result)
    } catch (err) {
        console.error("Error deleting image:", err)
    }
}

export {cloudinary, profilePhotosStorage, chatFilesStorage, deleteImageFromCloudinary}