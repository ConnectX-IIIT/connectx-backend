const cloudinary = require("../../configs/cloudinary");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.addPost = async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const photos = req.files;
    let attachedImages = [];

    try {
        for (let i = 0; i < photos.length; i = i + 1) {

            const result = await cloudinary.uploader.upload(photos[i].path);
            attachedImages[i] = result.url;
        }

        const post = new Post({ user: userId, title, description, isProject, reactions: 0, jobLink, attachedImages, timestamp: Date.now() });
        await post.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                posts: post._id.toString(),
            }
        });

        return res.status(200).json({
            message: `Post added successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}