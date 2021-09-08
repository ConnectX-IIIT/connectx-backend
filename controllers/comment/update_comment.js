const Comment = require("../../model/comment_schema");

exports.updateComment = async (req, res) => {

    const userDetails = req.userDetails;
    const commentId = req.params.commentId;
    const content = req.body.content;

    if (!content) {
        return res.status(400).json({
            error: `You can't post empty comment!`,
        });
    }

    if (!userDetails.comments.includes(commentId)) {
        return res.status(401).json({
            error: `You can't edit this comment!`,
        });
    }

    try {
        await Comment.updateOne(
            { _id: commentId }, {
            $set: {
                content,
            }
        });

        return res.status(200).json({
            message: `Comment updated successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}