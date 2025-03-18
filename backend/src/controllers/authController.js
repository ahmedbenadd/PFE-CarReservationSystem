const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const transporter = require("../config/nodemailer");


const signup = async (req, res, next) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Missing details");
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: email,
            subject: "Welcome to AutoGO!",
            text: `Welcome to AutoGO! your account has been created successfully with email address: ${email}`,
        }

        await transporter.sendMail(mailOptions);

        res.status(200).send();
    } catch (error) {
        console.error("Signup error:", error);
        next(error);
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            res.status(400);
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({email});
        if (!user) {
            res.status(400);
            throw new Error("Invalid email");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid password");
        }

        const token = jwt.sign({id: user._id}, env.JWT_SECRET, {expiresIn: "7d"});

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

const sendVerifyOtp = async (req, res, next) => {
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }
        if (user.isVerified) {
            res.status(400);
            throw new Error("User already verified.");
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;

        // Expires after 1H
        user.verifyOtpExpireAt = Date.now() + 60 * 60 * 1000;

        await user.save();
        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: user.email,
            subject: "Account Verification Code",
            text: `Hi ${user.name}, your account verification code is ${user.verifyOtp} .`,
        }
        await transporter.sendMail(mailOptions);
        res.status(200).send();
    } catch (error) {
        console.error("sendVerifyOtp error: ", error);
        next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const {userId, otp} = req.body;
        if (!userId || !otp) {
            res.status(400);
            throw new Error("Data is missing.");
        }

        const user = await User.findById(userId);
        
        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }
        
        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            res.status(400);
            throw new Error("Invalid verification code.");
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            res.status(400);
            throw new Error("Verification code is expired");
        }

        user.isVerified = true;
        user.verifyOtpExpireAt = 0;
        user.verifyOtp = '';
        await user.save();
        res.status(200).send();

    } catch (error) {
        console.error("VerifyOtp error:", error);
        next(error);
    }
}

const isAuthenticated = async (req, res, next) => {
    try {
        res.status(200).send();
    } catch (error) {
        next(error);
    }
}

const sendResetOtp = async (req, res, next) => {
    try {
        const {email} = req.body;
        if (!email) {
            res.status(400);
            throw new Error("Email is required");
        }
        const user = await User.findOne({email});
        if (!user) {
            res.status(404);
            throw new Error("Email not found.");
        }

        user.resetOtp = String(Math.floor(100000 + Math.random() * 900000));

        // Expires after 1H
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();
        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: user.email,
            subject: "Password Reset Code",
            text: `Hi ${user.name}, your password reset code is ${user.resetOtp} .`,
        }
        await transporter.sendMail(mailOptions);
        res.status(200).send();

    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const {email, otp, newPassword} = req.body;
        if (!email || !otp || !newPassword) {
            res.status(400);
            throw new Error("Data is missing.");
        }

        const user = await User.findOne({email});

        if (!user) {
            res.status(404);
            throw new Error("User not found.");
        }

        if(user.resetOtp === '' || user.resetOtp !== otp) {
            res.status(400);
            throw new Error("Invalid verification code.");
        }

        if (user.resetOtpExpireAt < Date.now()) {
            res.status(400);
            throw new Error("Verification code is expired");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtpExpireAt = 0;
        user.resetOtp = '';
        await user.save();


        user.isVerified = true;
        user.verifyOtpExpireAt = 0;
        user.verifyOtp = '';
        await user.save();
        res.clearCookie("token", {
            httpOnly: true,
        });
        res.status(200).send();

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendResetOtp,
    resetPassword,
};