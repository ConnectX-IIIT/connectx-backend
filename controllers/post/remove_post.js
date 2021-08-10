const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.removePost = async (req, res) => {
    const postId = req.params.key;
    const userId = req.userId;

    try {
        const response = await User.updateOne(
            { _id: userId }, {
            $pull: {
                posts: postId,
            }
        });

        if (response.nModified === 0) {
            return res.status(400).json({
                error: `You can't remove this post!`
            })
        }

        await Post.deleteOne({ _id: postId });

        return res.status(200).json({
            message: `Post removed!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}