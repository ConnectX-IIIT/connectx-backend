const Post = require("../../model/post_schema");

exports.addPost = (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const isProject = req.body.isProject;
    const jobLink = req.body.jobLink;
    const attachedImages = req.files;
    // const imageHeights = req.body.imageHeights;
    // const imageWidths = req.body.imageWidths;

    // if ( photoWidth > 1500) {
    //     photoHeight = photoHeight * 400 / photoWidth;
    //     photoWidth = 400;
    // }

    // const post = new Post({ user: userId, title, description, isProject, jobLink, imageHeights, imageWidths });
    // await post.save();

    // console.log(req.body);
    console.log(attachedImages);
}