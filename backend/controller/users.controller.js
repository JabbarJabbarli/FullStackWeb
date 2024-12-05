import User from "../models/users.model.js"

export const getUsersForSideBar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        if (!filteredUsers) {
            return res.status(404).json({ mes: "not found" })
        }

        res.status(200).json(filteredUsers)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

}