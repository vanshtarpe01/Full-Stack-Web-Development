const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");


async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]


    if (!token) {
        return res.status(401).json({
            message: "Unathorized access, token is missing"
        });
    }

    // console.log(token);


    try {
        const decoded = jwt.verify(token, process.env.JSON_SECRECTKEY)

        const user = await userModel.findById(decoded.userId)

        req.user = user

        return next()

    } catch (e) {
        return res.status(401).json({
            message: "Unatorized access,token is invalid"
        });
    }
}

module.exports = {
    authMiddleware
}