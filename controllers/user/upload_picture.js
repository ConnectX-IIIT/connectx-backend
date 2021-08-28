const User = require('../../model/user_schema');
const resizeImg = require('resize-img');
const fs = require('fs');
const cloudinary = require('../../configs/cloudinary');

exports.uploadPicture = async (req, res) => {
    const photo = req.file;
    const userId = req.userId;
    let photoHeight = req.body.height;
    let photoWidth = req.body.width;
    let photoType = req.body.type;

    if (photoHeight > photoWidth) {
        photoHeight = photoHeight * 400 / photoWidth;
        photoWidth = 400;
    } else if (photoHeight < photoWidth) {
        photoWidth = photoWidth * 400 / photoHeight;
        photoHeight = 400;
    } else {
        photoHeight = 400;
        photoWidth = 400;
    }

    try {
        const image = await resizeImg(fs.readFileSync(photo.path), {
            width: photoWidth,
            height: photoHeight
        });

        await fs.writeFileSync(photo.path, image);
        const result = await cloudinary.uploader.upload(photo.path, { quality: 'auto' });
        await fs.unlinkSync(photo.path);

        if (photoType == "true") {
            await User.updateOne(
                { _id: userId }, {
                $set: {
                    profilePicture: result.url,
                }
            });
        } else {
            await User.updateOne(
                { _id: userId }, {
                $set: {
                    backgroundPicture: result.url,
                }
            });
        }

        return res.status(200).json({
            message: 'Image uploaded successfully'
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};