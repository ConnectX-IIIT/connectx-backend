const User = require('../../model/user_schema');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

exports.verifyUser = async (req, res) => {
    const userToken = req.userToken;

    try {
        const decoded = await jwt.verify(userToken, process.env.SECRET_KEY);
        let userEmail = decoded.email;

        await User.updateOne(
            { email: userEmail }, {
            $set: {
                isVerified: true
            }
        });

        let options = {
            root: path.join(__dirname),
        };

        let fileName = "../../helper/user_verification.html";

        return res.status(200).sendFile(fileName, options);

    } catch (err) {
        return res.status(500).json({
            error: `${err}`,
        });
    }
};