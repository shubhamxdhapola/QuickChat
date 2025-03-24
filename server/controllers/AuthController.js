import bcrypt from "bcrypt"
import User from "../models/UserModel.js"
import { createToken } from "../utils/createToken.js"
import { deleteImageFromCloudinary } from "../utils/cloudinaryConfig.js"

export const signup = async (req, res) => {
    try {
        const { email, password} = req.body

        if(!email || !password ){
           return res.status(400).json({message : "All fields are required!"})
        }

        if(password.length < 6) {
           return res.status(400).json({message : "Password must be at least 6 characters!"})
        }

        const isUserAlreadyExist = await User.findOne({email})
        if(isUserAlreadyExist) {
            return res.status(400).json({message : 'Email already exists!'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password : hashedPassword
        })
        
        if(newUser) {
            await newUser.save()
            res.cookie('jwt', createToken(newUser._id, newUser.email), {
                maxAge : 7 * 24 * 60 * 60 * 1000,
                httpOnly : true,
                sameSite : "strict",
                secure : process.env.NODE_ENV !== 'development'
            })
            return res.status(200).json({
                user : {
                    id : newUser._id,
                    email : newUser.email,
                    profileSetUp : newUser.profileSetUp,
                    createdAt : newUser.createdAt,
                }
            })
        } else {
            res.status(400).json({message : 'Invalid user credentials!'})
        }
    } catch(err) {
        console.log("Error in sign up controller", err)
        res.status(500).json({message : 'Internal server error!'})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        let user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Invalid credentials!"})

        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid credentials!"})
        
        res.cookie('jwt', createToken(user._id, user.email), {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== 'development'
        })

        return res.status(200).json({
            user : {   
                id : user._id,
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                image : user.image,
                profileSetUp : user.profileSetUp,
                color : user.color,
                createdAt : user.createdAt,
            }
        })
    } catch(err) {
        console.log("Error in login controller", err)
        res.status(500).json({message : 'Internal server error!'})
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId)
        if(!userData) return res.status(404).json({message : "User not found."})

        return res.status(200).json({
            id : userData._id,
            email : userData.email,
            firstName : userData.firstName,
            lastName : userData.lastName,
            image : userData.image,
            profileSetUp : userData.profileSetUp,
            color : userData.color,
            createdAt : userData.createdAt,
        })
    } catch(err) {
        console.log("Error in getUserInfo controller.", err)
        return res.status(500).json({message : 'Internal server error!'})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {userId} = req
        const { firstName, lastName, color } = req.body
        
        if(!firstName || !lastName) {
            return res.status(404).send("All fields are required")
        }

        const userData  = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            color,
            profileSetUp : true,
        }, {new : true, runValidators : true}
        )
        
        return res.status(200).json({
            id : userData._id,
            email : userData.email,
            firstName : userData.firstName,
            lastName : userData.lastName,
            image : userData.image,
            profileSetUp : userData.profileSetUp,
            color : userData.color,
            createdAt : userData.createdAt
        })
    } catch(err) {
        console.log("Error in updateProfile controller.", err)
        return res.status(500).json({message : 'Internal server error!'})
    }
}

export const addProfileImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send("File is required")
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId, {
                image : req.file.path, 
                imagePublicId : req.file.filename
            },{ new : true, runValidators : true }
        )
        
        return res.status(200).json({
           image : updatedUser.image
        })
        
    } catch(err) {
        console.log("Error in addProfileImage controller.", err)
        return res.status(500).json({message : "Internal server error!"})
    }
}

export const removeProfileImage = async (req, res) => {
    try {
        const {userId} = req
        const user = await User.findById(userId)

        if(!user) return res.status(404).json({message : "User not found"})
        
        const publicId = user.imagePublicId
        await deleteImageFromCloudinary(publicId)

        user.image = null
        await user.save()

        return res.status(200).send("Profile image removed successfully")
        
    } catch(err) {
        console.log("Error in removeProfileImage controller.", err)
        return res.status(500).json({message : "Internal server error!"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', "", {maxAge : 0, secure : true, sameSite : "None" })
        return res.status(200).json({message : "Logout successfully."})
    } catch(err) {
        console.log("Error in Logout controller", err)
        return res.status(500).json({message : "Internal server error!"})
    }
}

