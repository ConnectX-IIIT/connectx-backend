const Post = require("../../model/post_schema");

exports.getPosts = async (req, res) => {

    try {
        const posts = await Post.find().sort({ "timestamp": -1 });
        const notBlogPosts = await Post.find({ $or: [{ isProject: true }, { jobLink: { $ne: "" } }] }).sort({ "timestamp": -1 });
        const notProjectPosts = await Post.find({ isProject: false }).sort({ "timestamp": -1 });
        const notJobPosts = await Post.find({ jobLink: "" }).sort({ "timestamp": -1 });
        const jobPosts = await Post.find({ jobLink: { $ne: "" } }).sort({ "timestamp": -1 });
        const blogPosts = await Post.find({ isProject: false, jobLink: "" }).sort({ "timestamp": -1 });
        const projectPosts = await Post.find({ isProject: true }).sort({ "timestamp": -1 });

        return res.status(200).json({
            postData: jobPosts.concat(projectPosts).concat(blogPosts)
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}