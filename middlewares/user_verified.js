const User = require("../model/user_schema");

exports.isUserVerified = async (req, res, next) => {
    const userId = req.userId;

    try {
        const userDetails = await User.findOne({ _id: userId });

        if (!userDetails.isVerified) {
            return res.status(408).json({
                error: "User not verified!",
            });
        }

        req.userDetails = userDetails;
        next();

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }

};