const Comment = require("../../model/comment_schema");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.removeComment = async (req, res) => {

    const commentId = req.params.key;
    const userId = req.userId;

    try {
        const comment = await Comment.findOne({ _id: commentId });

        if (comment.reference) {
            const removeReplyRes = await this.updateDatabaseToRemoveReply(comment, userId);

            if (removeReplyRes[0] != 200) {
                return res.status(400).json({
                    error: `You can't remove this comment!`,
                });
            }
        } else {
            const removeCommentRes = await this.updateDatabaseToRemoveComment(comment, userId);

            if (removeCommentRes[0] != 200) {
                return res.status(400).json({
                    error: `You can't remove this comment!`,
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
}

exports.updateDatabaseToRemoveComment = async (comment, userId) => {
    const response = await User.updateOne(
        { _id: userId },
        {
            $pull: {
                comments: comment._id.toString(),
            },
        }
    );

    if (response.nModified === 0) {
        return [400, "You can't remove this comment!"];
    }

    const comments = await Comment.find({ _id: { $in: comment.replies } });

    for (let comment of comments) {
        const removeReplyRes = await this.updateDatabaseToRemoveReply(comment, comment.user);

        if (removeReplyRes[0] != 200) {
            return [401, "You can't remove this comment!"];
        }
    }

    await Post.updateOne(
        { _id: comment.postId },
        {
            $pull: {
                comments: comment._id.toString(),
            },
        }
    );

    await this.updateDatabaseToRemoveVotedUsers(comment);
    await Comment.deleteOne({ _id: comment._id.toString() });

    return [200, "Comment removed!"];
}

exports.updateDatabaseToRemoveReply = async (comment, userId) => {
    const response = await User.updateOne(
        { _id: userId },
        {
            $pull: {
                comments: comment._id.toString(),
            },
        }
    );

    if (response.nModified === 0) {
        return [400, "You can't remove this comment!"];
    }

    await Comment.updateOne(
        { _id: comment.reference },
        {
            $pull: {
                replies: comment._id.toString(),
            },
        }
    );

    await this.updateDatabaseToRemoveVotedUsers(comment);
    await Comment.deleteOne({ _id: comment._id.toString() });

    return [200, "Reply removed!"];
}

exports.updateDatabaseToRemoveVotedUsers = async (comment) => {
    await User.updateMany(
        { _id: { $in: comment.upvotedUsers } },
        {
            $pull: {
                upvotedComments: comment._id.toString(),
            },
        }
    );

    await User.updateMany(
        { _id: { $in: comment.downvotedUsers } },
        {
            $pull: {
                downvotedComments: comment._id.toString(),
            },
        }
    );
}