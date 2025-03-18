const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = require("../config/env").JWT_SECRET;

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Missing details");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).send();
    } catch (error) {
        console.error("Signup error:", error);
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400);
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("Invalid email");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).send();
    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });

        res.status(200).send();
    } catch (error) {
        console.error("Logout error:", error);
        next(error);
    }
};

module.exports = {
    signup,
    login,
    logout,
};