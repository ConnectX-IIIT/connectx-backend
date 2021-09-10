const cloudinary = require("../../configs/cloudinary");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");
const resizeImg = require('resize-img');
const fs = require('fs');

exports.addPost = async (req, res) => {
    const userId = req.userId;
    const userDetails = req.userDetails;
    const title = req.body.title;
    const description = req.body.description;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const imageDimensions = JSON.parse(req.body.attachedImgDimensions);
    const photos = req.files;
    let attachedImages = [];
    const userName = userDetails.name;
    const userProfile = userDetails.profilePicture;

    try {
        for (let i = 0; i < photos.length; i = i + 1) {

            if (imageDimensions[i].width > 1500) {
                imageDimensions[i].height = imageDimensions[i].height * 1500 / imageDimensions[i].width;
                imageDimensions[i].width = 1500;
            }

            const image = await resizeImg(fs.readFileSync(photos[i].path), {
                width: imageDimensions[i].width,
                height: imageDimensions[i].height
            });

            await fs.writeFileSync(photos[i].path, image);
            const result = await cloudinary.uploader.upload(photos[i].path, { quality: 'auto' });
            await fs.unlinkSync(photos[i].path);

            attachedImages[i] = result.url;
        }

        const post = new Post({ user: userId, title, description, isProject, reactions: 0, jobLink, userName, userProfile, attachedImages, imageDimensions, timestamp: Date.now() });
        await post.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                posts: post._id.toString(),
            }
        });

        return res.status(200).json({
            post,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}