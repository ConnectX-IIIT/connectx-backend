const jwt = require("jsonwebtoken");
const decode = require('jwt-decode');
const User = require("../model/user_schema");

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(404).json({
            error: "Token not found!",
        });
    }

    try {
        const { exp } = decode(token);

        if (Date.now() >= exp * 1000) {
            return res.status(405).json({
                error: 'Your session has expired, please login again!'
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decoded.email;
        const userId = decoded.userId;

        const userDetails = await User.findOne({ email: userEmail });

        if (!userDetails) {
            return res.status(406).json({
                error: "Invalid token!",
            });
        }

        req.email = userEmail;
        req.userId = userId;
        next();

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }

};