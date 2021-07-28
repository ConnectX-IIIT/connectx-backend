const { uploadFile } = require('../../configs/aws_s3');
const User = require('../../model/user_schema');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.uploadProfilePicture = async (req, res) => {
    const photo = req.file;
    const userId = req.body.userId;

    try {
        const result = await uploadFile(photo);

        await unlinkFile(photo.path);

        await User.updateOne(
            { _id: userId }, {
            $set: {
                profilePicture: result.Key,
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