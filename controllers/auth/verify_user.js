const User = require('../../model/user_schema');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

exports.verifyUser = async (req, res) => {
    const userToken = req.params.userToken;

    try {
        const decoded = await jwt.verify(userToken, process.env.SECRET_KEY);
        let userEmail = decoded.email;

        await User.updateOne(
            { email: userEmail }, {
            $set: {
                isMailVerified: true
            }
        });

        return res.status(200).sendFile(path.resolve(__dirname + '../../../helper/user_verification.html'));

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
};