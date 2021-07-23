const User = require('../../model/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const { email_verified, email, name } = response.payload;

        if (email_verified) {
            const user = await User.findOne({ email });

            if (user) {
                tokenGenerate(user, res);
            }

            const password = email + process.env.SECRET_KEY;
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hash });
            await newUser.save();

            tokenGenerate(newUser, res);
        }

    } catch (error) {
        return res.status(500).json({
            error: `${error}`
        })
    }
}

async function tokenGenerate(user, res) {
    const token = await jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.SECRET_KEY
    );

    return res.status(200).json({
        message: 'user signed in successfully',
        token: `${token}`,
        user: {
            email: user.email,
            name: user.name
        }
    })
}