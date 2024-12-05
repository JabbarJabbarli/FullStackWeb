import jwt from "jsonwebtoken"
export const generateTokenAndCookie = (userId, res) => {
    const TOKEN = process.env.TOKEN_JWT

    const token = jwt.sign({ userId }, TOKEN, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}
export default generateTokenAndCookie