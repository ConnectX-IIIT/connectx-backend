const User = require('../../model/user_schema');

exports.uploadBackgroundImage = async (req, res) => {
    const coverPhoto = req.file.filename;
    const userId = req.body.userId;

    try {
        await User.updateOne(
            { _id: userId }, {
            $set: {
                backgroundPicture: coverPhoto,
            }
        });

        return res.status(200).json({
            message: 'Image uploaded successfully'
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};