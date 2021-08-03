const { removeFile } = require("../../configs/aws_s3");
const User = require("../../model/user_schema");

exports.removeImage = async (req, res) => {

    try {
        const key = req.params.key;
        const userId = req.userId;
        const photoType = req.body.type;
        const result = await removeFile(key);

        if (result != null) {

            if (photoType == "true") {
                await User.updateOne(
                    { _id: userId }, {
                    $set: {
                        profilePicture: "",
                    }
                });
            } else {
                await User.updateOne(
                    { _id: userId }, {
                    $set: {
                        backgroundPicture: "",
                    }
                });
            }

            return res.status(200).send('File removed successfully!');

        } else {
            return res.status(400).json({
                error: `File not found!`
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
}