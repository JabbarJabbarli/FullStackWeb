import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/connectDB.js"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser"
import userRoutes from "../backend/routes/users.routes.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()
const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`server is working on ${PORT}`)
})