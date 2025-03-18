const jwt = require("jsonwebtoken");
const env = require("../config/env");

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            res.status(401);
            throw new Error("Token is missing.");
        }
        const tokenDecode = jwt.verify(req.cookies.token, env.JWT_SECRET);
        if(!tokenDecode.id) {
            res.status(401);
            throw new Error("Token is missing.");
        }
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = userAuth;
