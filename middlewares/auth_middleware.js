const jwt = require("jsonwebtoken");
const User = require("../model/user_schema");

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(404).json({
            message: "Token not found",
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        const userEmail = decoded.email;
        const userId = decoded.id;

        const userDetails = await User.findOne({ email: userEmail });

        if (!userDetails) {
            return res.status(400).json({
                message: "Invalid token",
            });
        }

        req.email = userEmail;
        req.userId = userId;
        next();

    } catch (err) {
        return res.status(500).json({
            message: `${err}`,
        });
    }

};