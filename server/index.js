import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/AuthRoutes.js'
import contactsRoute from './routes/ContactRoutes.js'
import setupSocket from './socket.js'
import messagesRoutes from './routes/MessagesRoutes.js'
import { connectDB } from './utils/connectDB.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT 

app.use(
    cors({
        origin : process.env.ORIGIN,
        methods : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials : true
    })
)

app.use(cookieParser())
app.use(express.json())

app.use('/uploads/profiles', express.static('uploads/profiles'))
app.use('/uploads/files', express.static('uploads/files'))

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoute)
app.use('/api/messages', messagesRoutes)

const server = app.listen(PORT, () => {
    console.log("Server is listening at PORT", PORT)  
    connectDB()
    .then(() => console.log("DB is conected"))
    .catch((err) => console.log(err))
})

setupSocket(server)