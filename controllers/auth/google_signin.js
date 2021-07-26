const User = require('../../model/user_schema');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const { email_verified, email } = response.payload;

        if (email_verified) {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({
                    error: `User does not exist!`
                })
            }

            const token = await jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                process.env.SECRET_KEY
            );

            return res.status(200).json({
                userId: user._id,
                token: `${token}`
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured`
        })
    }
}