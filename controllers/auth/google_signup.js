const User = require('../../model/user_schema');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignup = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const { email_verified, email, name } = response.payload;

        if (email_verified) {
            const user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({
                    error: `User already exists!`
                })
            }

            const newUser = new User({ name, email, isMailVerified: true });
            await newUser.save();

            const token = await jwt.sign(
                {
                    userId: newUser._id,
                    email: newUser.email
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: 60 * 60 * 24
                }
            );

            return res.status(200).json({
                userData: newUser,
                token: `${token}`
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}