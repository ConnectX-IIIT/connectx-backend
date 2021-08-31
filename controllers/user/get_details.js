const User = require('../../model/user_schema');

exports.getDetails = async (req, res) => {

    const userId = req.userId;
    const otherUserId = req.params.userId;
    let userDetails;

    try {
        if (otherUserId) {
            userDetails = await User.findOne({ _id: otherUserId });
        } else {
            userDetails = await User.findOne({ _id: userId });
        }

        return res.status(200).json({
            userData: userDetails
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }

}