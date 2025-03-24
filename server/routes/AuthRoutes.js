import multer from 'multer'
import { Router } from 'express'
import { verifyToken } from '../middlewares/AuthMiddleware.js'
import { profilePhotosStorage } from '../utils/cloudinaryConfig.js'
import { 
    signup, 
    addProfileImage, 
    logout,
    getUserInfo, 
    updateProfile, 
    login, 
    removeProfileImage, 
} from '../controllers/AuthController.js'

const authRoutes = Router()
const upload = multer({ storage : profilePhotosStorage });

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.get('/user-info', verifyToken, getUserInfo)
authRoutes.post('/update-profile', verifyToken, updateProfile)
authRoutes.post('/add-profile-image', verifyToken, upload.single('profile-image'), addProfileImage)
authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage)
authRoutes.post('/logout', logout )

export default authRoutes