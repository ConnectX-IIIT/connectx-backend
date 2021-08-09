const { uploadFile } = require("../../configs/aws_s3");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");
const fs = require('fs');

exports.addPost = async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const photos = req.files;
    let attachedImages = [];
    let userName;
    let userProfile;

    try {
        const userDetails = await User.findOne({ _id: userId });
        userName = userDetails.name;
        userProfile = userDetails.profilePicture;

        for (let i = 0; i < photos.length; i = i + 1) {

            const image = await fs.readFileSync(photos[i].path);
            await fs.writeFileSync(photos[i].path, image);

            const fileStream = fs.createReadStream(photos[i].path);
            const result = await uploadFile(photos[i], fileStream);
            fileStream.destroy();

            attachedImages[i] = result.key;
            await fs.unlinkSync(photos[i].path);
        }

        const post = new Post({ user: userId, title, description, isProject, jobLink, userName, userProfile, attachedImages, timestamp: Date.now() });
        await post.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                posts: post._id,
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