import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const verifyToken = async (req, res, next) => {
    
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message : 'Unauthorized - No Token Provided!'})

        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        if(!decodedToken) res.status(401).json({message : 'Unauthorized - Invalid Token'})

        const user = await User.findById(decodedToken.userId)
        if(!user) return res.status(404).json({message : 'User not found!'})

        req.userId = user._id

        next()

    } catch(err) {
        console.log("Error in Protected route", err)
        res.status(500).json({message : 'Internal server error!'})
    }
}