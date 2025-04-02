const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const transporter = require("../config/nodemailer");
const path = require("path");
const ejs = require("ejs");

const signup = async (req, res, next) => {
    const {name, email, tel, password} = req.body;

    try {
        if (!name || !email || !password || !tel) {
            return res.json({
                success: false,
                message: "Missing Data"
            });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword, tel});
        await user.save();
        const token = jwt.sign({id: user._id}, env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Render the HTML email template dynamically
        const templatePath = path.join(__dirname, "../../public/templates/welcomeEmail.ejs");
        const html = await ejs.renderFile(templatePath, {
            name: user.name,
            email: user.email,
            primaryColor: "#0065a1", // Your primary color
            websiteUrl: "http://localhost:3000/", // Replace with your website URL
        });

        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: email,
            subject: "Welcome to AutoGO!",
            html: html,
        }

        await transporter.sendMail(mailOptions);
        return res.json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            })
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Email or password"
            })
        }

        const token = jwt.sign({id: user._id}, env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });
        return res.json({
            success: true,
            message: "Logout successfully",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const sendVerifyOtp = async (req, res, next) => {
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        if (user.isVerified) {
            return res.json({
                success: false,
                message: "Account already verified"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;

        // Expires after 1H
        user.verifyOtpExpireAt = Date.now() + 60 * 60 * 1000;

        await user.save();

        // Render the HTML email template dynamically
        const templatePath = path.join(__dirname, "../../public/templates/verifyEmail.ejs");
        const html = await ejs.renderFile(templatePath, {
            name: user.name,
            otp: user.verifyOtp,
            primaryColor: "#0065a1", // Your primary color
            websiteUrl: "http://localhost:3000/", // Replace with your website URL
        });

        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: user.email,
            subject: "Account Verification Code",
            html: html, // Use the rendered HTML template
        };
        await transporter.sendMail(mailOptions);
        return res.json({
            success: true,
            message: "Verification Code Successfully Sent",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const {userId, otp} = req.body;
        if (!userId || !otp) {
            return res.json({
                success: false,
                message: "Missing Data"
            })
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        
        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: "Invalid verification code"
            })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "Verification code is expired"
            })
        }

        user.isVerified = true;
        user.verifyOtpExpireAt = 0;
        user.verifyOtp = '';
        await user.save();
        return res.json({
            success: true,
            message: "Account Verified Successfully",
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

const isAuthenticated = async (req, res, next) => {
    try {
        return res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

const sendResetOtp = async (req, res, next) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.json({
                success: false,
                message: "Email is required"
            })
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        user.resetOtp = String(Math.floor(100000 + Math.random() * 900000));

        // Expires after 15min
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Render the HTML email template dynamically
        const templatePath = path.join(__dirname, "../../public/templates/resetPasswordEmail.ejs");
        const html = await ejs.renderFile(templatePath, {
            name: user.name,
            otp: user.resetOtp,
            primaryColor: "#0065a1", // Your primary color
            websiteUrl: "http://localhost:3000/", // Replace with your website URL
        });

        const mailOptions = {
            from: env.SMTP_EMAIL,
            to: user.email,
            subject: "Password Reset Code",
            html: html, // Use the rendered HTML template
        };

        await transporter.sendMail(mailOptions);
        return res.json({
            success: true,
            message: "Reset code sent to your email",
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

const verifyResetOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Missing Data",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        if (user.resetOtp === "") {
            return res.json({
                success: false,
                message: "Invalid verification code",
            });
        }

        if (user.resetOtp !== otp) {
            return res.json({
                success: false,
                message: "Incorrect verification code",
            });
        }

        return res.json({
            success: true,
            message: "Code verified successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const {email, otp, newPassword} = req.body;
        if (!email || !otp || !newPassword) {
            return res.json({
                success: false,
                message: "Data is missing"
            });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        if(user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({
                success: false,
                message: "Reset code is invalid",
            })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "Reset code is already expired",
            })
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtpExpireAt = 0;
        user.resetOtp = '';
        await user.save();
        return res.json({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })    }
}

module.exports = {
    signup,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendResetOtp,
    verifyResetOtp,
    resetPassword,
};
