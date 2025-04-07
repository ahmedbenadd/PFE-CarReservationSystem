const jwt = require("jsonwebtoken");
const env = require("../config/env");

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.json({
                success: false,
                message: "Not Authorized. Login First",
            })
        }
        const tokenDecode = jwt.verify(req.cookies.token, env.JWT_SECRET);
        if(!tokenDecode.id) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again",
            })
        }
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = userAuth;


