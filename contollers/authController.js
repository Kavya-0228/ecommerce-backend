const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "mysecretkey";
const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(400).json({ error: "Invalid password" });
            return;
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        );
        res.status(200).json({ message: "User logged in successfully",token});
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports = { registerUser, loginUser };