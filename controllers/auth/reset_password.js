const User = require('../../model/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
require('dotenv').config();
const { passwordValidate } = require('../../helper/password_validator');

exports.resetPassword = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;
    const cPassword = req.body.cPassword;

    if (!token) {
        return res.status(404).json({
            error: 'Token not found!'
        })
    }

    if (!password || !cPassword) {
        return res.status(400).json({
            error: 'Please fill all the details properly!'
        })
    }

    if (password != cPassword) {
        return res.status(401).json({
            error: 'Password not matched!'
        })
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
        return res.status(402).json({
            error: `${passwordValidation[1]}`,
        });
    }

    try {
        const { exp } = decode(token);

        if (Date.now() >= exp * 1000) {
            return res.status(405).json({
                error: 'Reset password link expired!'
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decoded.email;

        const userDetails = await User.findOne({ email: userEmail });

        if (!userDetails) {
            return res.status(403).json({
                error: 'User does not exist!'
            })
        }

        const hash = await bcrypt.hash(password, 10);

        await User.updateOne(
            { email: userEmail }, {
            $set: {
                password: hash
            }
        });

        return res.status(200).json({
            message: `Password updated!`,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
};