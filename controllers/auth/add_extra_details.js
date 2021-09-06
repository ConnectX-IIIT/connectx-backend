const Group = require('../../model/group_schema');
const User = require('../../model/user_schema');
require('dotenv').config();

exports.addExtraDetails = async (req, res) => {

    const userId = req.userId;
    const { mobile, batch, joiningYear, gender, passingYear, description, isAlumni } = req.body;

    if (!mobile || !batch || !joiningYear || !passingYear || !gender || !description) {
        return res.status(400).json({
            error: 'Please fill all details properly!'
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
                isVerified: false,
                isAdmin: false
            }
        });

        const userDetails = await User.findOne({ _id: userId });
        const group = await Group.find({ name: batch + "-" + joiningYear });

        if (group.length) {
            await Group.updateOne(
                { _id: group._id }, {
                $push: {
                    members: {
                        userId,
                        userProfile: userDetails.profilePicture,
                        userName: userDetails.name
                    }
                }
            });

        } else {
            const newGroup = new Group({
                name: batch + "-" + joiningYear,
                profilePicture: "",
                description: "",
                members: [
                    {
                        userId,
                        userProfile: userDetails.profilePicture,
                        userName: userDetails.name
                    }
                ]
            });
            await newGroup.save();
        }

        return res.status(200).json({
            message: 'details updated successfully'
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
}