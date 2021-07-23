const User = require('../../model/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Please fill all details properly'
        })
    }

    try {
        const userDetails = await User.findOne({ email: email });

        if (!userDetails) {
            return res.status(401).json({
                error: 'user does not exist'
            })
        }

        const result = await bcrypt.compare(password, userDetails.password);
        if (!result) {
            return res.status(444).json({
                error: "Incorrect password!",
            });
        }

        const token = await jwt.sign(
            {
                userId: user._id,
                email: email
            },
            process.env.SECRET_KEY
        );

        return res.status(200).json({
            userId: user._id,
            token: `${token}`
        })

    } catch (err) {
        return res.status(500).json({
            error: `${err}`
        })
    }
}