const User = require('../../model/user_schema');
const { passwordValidate } = require('../../helper/password_validator');

exports.setPassword = async (req, res) => {
    const userId = req.userId;
    const password = req.body.password;
    const cPassword = req.body.cPassword;

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
        const userDetails = await User.findOne({ _id: userId });

        if (!userDetails) {
            return res.status(403).json({
                error: 'User does not exist!'
            })
        }

        const hash = await bcrypt.hash(password, 10);

        await User.updateOne(
            { _id: userId }, {
            $set: {
                password: hash
            }
        });

        return res.status(200).json({
            message: `Password updated!`,
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
};