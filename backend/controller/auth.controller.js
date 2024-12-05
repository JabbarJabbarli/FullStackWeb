import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateTokenAndCookies.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ mes: "Passwords do not match" });
    }

    const findUser = await User.findOne().where("username").equals(username);
    if (findUser)
      return res.status(409).json({ mes: "This username is already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      gender,
      profilePic,
    });
    console.log(newUser);

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      const saveUser = await newUser.save();
      if (!saveUser) return res.status(400).json({ mes: "User is not added" });
      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }

    console.log(saveUser);

    res.status(200).json({ mes: "hello" });
  } catch {
    res.status(500).json({ mes: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    generateTokenAndCookie(user._id, res);
    if (!isPasswordCorrect || !username)
      return res.status(400).json({ mes: "username or password is wrong" });

    res.status(201).json({ mes: `Welcome ${username}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ mes: "You logged out" });
  } catch {
    res.status(400).json({ mes: "Could not log out" });
  }
};
