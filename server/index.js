import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/AuthRoutes.js'
import contactsRoute from './routes/ContactRoutes.js'
import setupSocket from './socket.js'
import messagesRoutes from './routes/MessagesRoutes.js'
import { connectDB } from './utils/connectDB.js'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT 
const __dirname = path.resolve()

app.use(
    cors({
        origin : process.env.ORIGIN,
        credentials : true
    })
)

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoute)
app.use('/api/messages', messagesRoutes)

if(process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
    })
}

const server = app.listen(PORT, () => {
    console.log("Server is listening at PORT", PORT)  
    connectDB()
    .then(() => console.log("DB is conected"))
    .catch((err) => console.log(err))
})

setupSocket(server)