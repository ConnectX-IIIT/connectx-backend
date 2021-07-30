const { uploadFile } = require('../../configs/aws_s3');
const User = require('../../model/user_schema');
const resizeImg = require('resize-img');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.uploadBackgroundImage = async (req, res) => {
    const coverPhoto = req.file;
    const userId = req.userId;
    let coverPhotoHeight = req.body.height;
    let coverPhotoWidth = req.body.width;

    if (coverPhotoHeight > coverPhotoWidth) {
        coverPhotoHeight = coverPhotoHeight * 400 / coverPhotoWidth;
        coverPhotoWidth = 400;
    } else {
        coverPhotoWidth = coverPhotoWidth * 400 / coverPhotoHeight;
        coverPhotoHeight = 400;
    }

    if (coverPhoto.size > 10486000) {
        return res.status(400).json({
            error: 'Please Upload a picture that is less than 10MB in size!'
        })
    }

    try {
        const image = await resizeImg(fs.readFileSync(coverPhoto.path), {
            width: coverPhotoWidth,
            height: coverPhotoHeight
        });

        await fs.writeFileSync(coverPhoto.path, image);

        const result = await uploadFile(coverPhoto);
        await unlinkFile(coverPhoto.path);

        await User.updateOne(
            { _id: userId }, {
            $set: {
                backgroundPicture: result.Key,
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