const User = require('../../model/user_schema');

exports.fetchUsers = async (req, res) => {

    const userId = req.userId;

    try {
        const userDetails = await User.find({ _id: { $ne: userId } });

        return res.status(200).json({
            userData: userDetails
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }

}