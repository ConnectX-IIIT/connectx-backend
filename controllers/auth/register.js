const User = require('../../model/user_schema');
require('dotenv').config();

exports.register = async (req, res) => {
    const { mobile, batch, joiningYear, gender, passingYear, description, isAlumni, userId } = req.body;

    if (!mobile || !batch || !joiningYear || !passingYear || !gender || !description) {
        return res.status(400).json({
            error: 'Please fill all details properly'
        })
    }

    try {
        await User.updateOne(
            { _id: userId }, {
            $set: {
                mobile,
                batch,
                joiningYear,
                passingYear,
                gender,
                isAlumni,
                description,
                isVerified: false
            }
        });

        return res.status(200).json({
            message: 'details updated successfully'
        })

    } catch (error) {
        return res.status(500).json({
            error: `${err}`
        })
    }
}