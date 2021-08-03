const Post = require("../../model/post_schema");

exports.getPost = async (req, res) => {

    try {
        const posts = await Post.find().sort({ "timestamp": -1 });

        return res.status(200).json({
            postData: posts
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}