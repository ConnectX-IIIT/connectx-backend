const cloudinary = require("../../configs/cloudinary");
const User = require("../../model/user_schema");

exports.removeImage = async (req, res) => {

    const photoURL = req.body.photoURL;
    const userId = req.userId;
    const photoType = req.body.type;

    try {
        const publicId = photoURL.substring(photoURL.lastIndexOf('/') + 1, photoURL.lastIndexOf('.'));
        const destroyRes = await cloudinary.uploader.destroy(publicId);

        if (destroyRes.result === "ok") {

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