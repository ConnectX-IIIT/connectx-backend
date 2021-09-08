const cloudinary = require("../../configs/cloudinary");
const Post = require("../../model/post_schema");
const resizeImg = require('resize-img');
const fs = require('fs');

exports.updatePost = async (req, res) => {

    const userId = req.userId;
    const postId = req.params.postId;
    const title = req.body.title;
    const description = req.body.description;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const newImageURLs = JSON.parse(req.body.imageLinks);
    const imageDimensions = JSON.parse(req.body.attachedImgDimensions);
    const photos = req.files;
    let attachedImages = [];
    let i = 0;
    let j = 0;

    try {
        const post = await Post.findOne({ _id: postId });
        const oldImagesURLs = post.attachedImages;

        if (post.user != userId) {
            return res.status(400).json({
                error: `You can't edit this post!`,
            });
        }

        for (i; i < oldImagesURLs.length; i = i + 1) {

            if (newImageURLs.includes(oldImagesURLs[i])) {
                attachedImages[i] = oldImagesURLs[i];
            } else {
                const publicId = oldImagesURLs[i].substring(oldImagesURLs[i].lastIndexOf('/') + 1, oldImagesURLs[i].lastIndexOf('.'));
                await cloudinary.uploader.destroy(publicId);
            }
        }

        for (j; j < photos.length; j = j + 1) {

            if (imageDimensions[j].width > 1500) {
                imageDimensions[j].height = imageDimensions[j].height * 1500 / imageDimensions[j].width;
                imageDimensions[j].width = 1500;
            }

            const image = await resizeImg(fs.readFileSync(photos[j].path), {
                width: imageDimensions[j].width,
                height: imageDimensions[j].height
            });

            await fs.writeFileSync(photos[j].path, image);
            const result = await cloudinary.uploader.upload(photos[j].path, { quality: 'auto' });
            await fs.unlinkSync(photos[j].path);

            attachedImages[i] = result.url;
            i = i + 1;
        }

        await Post.updateOne(
            { _id: postId }, {
            $set: {
                title,
                description,
                isProject,
                jobLink,
                attachedImages,
            }
        });

        return res.status(200).json({
            message: `Post updated successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}