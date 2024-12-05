import jwt from "jsonwebtoken"
import User from "../models/users.model.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ mes: "Unauthorized - No token provided`" })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_JWT)

        if (!decoded) {
            return res.status(401).json({ mes: "you have no token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ mes: `${user} is not found` })
        }

        req.user = user
        next();

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export default protectRoute