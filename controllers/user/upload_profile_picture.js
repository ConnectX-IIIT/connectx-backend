const { uploadFile } = require('../../configs/aws_s3');
const User = require('../../model/user_schema');
const resizeImg = require('resize-img');
const fs = require('fs');

exports.uploadProfilePicture = async (req, res) => {
    const photo = req.file;
    const userId = req.userId;
    let photoHeight = req.body.height;
    let photoWidth = req.body.width;

    if (photoHeight > photoWidth) {
        photoHeight = photoHeight * 400 / photoWidth;
        photoWidth = 400;
    } else {
        photoWidth = photoWidth * 400 / photoHeight;
        photoHeight = 400;
    }

    if (photo.size > 10486000) {
        return res.status(400).json({
            error: 'Please Upload a picture that is less than 10MB in size!'
        })
    }

    try {
        const image = await resizeImg(fs.readFileSync(photo.path), {
            width: photoWidth,
            height: photoHeight
        });

        await fs.writeFileSync(photo.path, image);

        const fileStream = fs.createReadStream(photo.path);
        const result = await uploadFile(photo, fileStream);
        fileStream.destroy();

        await fs.unlinkSync(photo.path);

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
        console.log(error);
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};