import Message from "../models/MessagesModel.js"
import {renameSync, mkdirSync} from 'fs'

export const getMessages = async (req, res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id
        
        if(!user1 || !user2) {
            return res.status(400).send("Both users are required.")
        }

        const messages = await Message.find({
            $or : [
                {sender : user1, recipient : user2},
                {sender : user2, recipient : user1},
            ]
        }).sort({timestamp : 1})
        
        return res.status(200).json({messages})
    } catch(err) {
        console.log("Error in getMessages controller", err)
        return res.status(500).json({message : 'Internal server error!'})
    }
}

export const uploadFile = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.status(400).send("File is required")
        }
        
        return res.status(200).json({filePath : req.file.path})
    } catch(err) {
        console.log("Error in uploadFile controller", err)
        return res.status(500).json({message : 'Internal server error!'})
    }
}