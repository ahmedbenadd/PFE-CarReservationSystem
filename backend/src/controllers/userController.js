const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUserData = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        return res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                tel: user.tel,
                isVerified: user.isVerified
            }
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userId, name, email, tel } = req.body;
        if (!name || !email || !tel) {
            return res.json({
                success: false,
                message: "Missing Data",
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            })
        }
        if(user.email !== email) {
            user.isVerified = false;
            user.email = email;
        }
        user.name = name;
        user.tel = tel;
        await user.save();

        return res.json({
            success: true,
            message: "Successfully updated data",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const updatePassword = async (req, res, next) => {
    try {
        console.log(req.body);
        const { userId, password, newPassword } = req.body;
        if (!password || !newPassword) {
            return res.json({
                success: false,
                message: "Missing Data",
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password",
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.json({
            success: true,
            message: "Successfully updated password",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    getUserData,
    updateUser,
    updatePassword,
}