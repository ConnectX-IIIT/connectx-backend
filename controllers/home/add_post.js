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
    let i = 0;
    let userName;
    let userProfile;
    // const imageHeights = req.body.imageHeights;
    // const imageWidths = req.body.imageWidths;

    // if ( photoWidth > 1500) {
    //     photoHeight = photoHeight * 400 / photoWidth;
    //     photoWidth = 400;
    // }

    try {
        const userDetails = await User.findOne({ _id: userId });
        userName = userDetails.name;
        userProfile = userDetails.profilePicture;

        for (let photo of photos) {

            const image = await fs.readFileSync(photo.path);
            await fs.writeFileSync(photo.path, image);

            const fileStream = fs.createReadStream(photo.path);
            const result = await uploadFile(photo, fileStream);
            fileStream.destroy();

            attachedImages[i] = result.key;
            i++;

            await fs.unlinkSync(photo.path);
        }

        const post = new Post({ user: userId, title, description, isProject, jobLink, userName, userProfile, attachedImages, timestamp: Date.now() });
        await post.save();

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
    console.log(attachedImages);
}