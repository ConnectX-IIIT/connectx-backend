const Post = require("../../model/post_schema");

exports.addPost = (req, res) => {
    const userId = req.userId;
    const title = req.body.postTitle;
    const description = req.body.postDescription;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const attachedImages = req.file;
    const imageHeights = req.body.imageHeights;
    const imageWidths = req.body.imageWidths;

    // if ( photoWidth > 1500) {
    //     photoHeight = photoHeight * 400 / photoWidth;
    //     photoWidth = 400;
    // }

    // const post = new Post({ user: userId, title, description, isProject, jobLink, imageHeights, imageWidths });
    // await post.save();

    console.log(attachedImages);
}