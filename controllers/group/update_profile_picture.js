const resizeImg = require('resize-img');
const fs = require('fs');
const cloudinary = require('../../configs/cloudinary');
const Group = require('../../model/group_schema');

exports.updateGroupProfilePicture = async (req, res) => {

    const photo = req.file;
    const userId = req.userId;
    const userDetails = req.userDetails;
    let photoHeight = req.body.height;
    let photoWidth = req.body.width;

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

        const group = await Group.findOne({ name: userDetails.batch + "-" + userDetails.joiningYear });

        const user = await Group.findOne(
            { members: { $elemMatch: { userId: userId } } }
        )

        if (!user) {
            return res.status(400).json({
                error: `You can't edit profile picture!`
            })
        }

        if (group.profilePicture) {
            const publicId = group.profilePicture.substring(group.profilePicture.lastIndexOf('/') + 1, group.profilePicture.lastIndexOf('.'));
            await cloudinary.uploader.destroy(publicId);
        }

        await fs.writeFileSync(photo.path, image);
        const result = await cloudinary.uploader.upload(photo.path, { quality: 'auto' });
        await fs.unlinkSync(photo.path);

        await Group.updateOne(
            { _id: group._id }, {
            $set: {
                profilePicture: result.url,
            }
        });

        return res.status(200).json({
            url: result.url,
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};