import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async () => {

    const MONGO_DB = process.env.MONGO_DB
    try {

        await mongoose.connect(MONGO_DB)
        console.log("connected to mongoDB")
    }
    catch {
        console.log("not connected to mongoDB")
    }
}

export default connectDB