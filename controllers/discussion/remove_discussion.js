const Discussion = require("../../model/discussion_schema");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.removeDiscussion = async (req, res) => {

    const discussionId = req.params.key;
    const userId = req.userId;

    try {
        const discussion = await Discussion.findOne({ _id: discussionId });

        if (discussion.reference) {
            const removeReplyRes = await this.updateDatabaseToRemoveReply(discussion, userId);

            if (removeReplyRes[0] != 200) {
                return res.status(400).json({
                    error: `You can't remove this comment!`,
                });
            }
        } else {
            const removeDiscussionRes = await this.updateDatabaseToRemoveDiscussion(discussion, userId);

            if (removeDiscussionRes[0] != 200) {
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

exports.updateDatabaseToRemoveDiscussion = async (discussion, userId) => {
    const response = await User.updateOne(
        { _id: userId },
        {
            $pull: {
                discussions: discussion._id.toString(),
            },
        }
    );

    if (response.nModified === 0) {
        return [400, "You can't remove this comment!"];
    }

    const discussions = await Discussion.find({ _id: { $in: discussion.replies } });

    for (let discussion of discussions) {
        const removeReplyRes = await this.updateDatabaseToRemoveReply(discussion, discussion.user);

        if (removeReplyRes[0] != 200) {
            return [401, "You can't remove this comment!"];
        }
    }

    await Post.updateOne(
        { _id: discussion.postId },
        {
            $pull: {
                discussions: discussion._id.toString(),
            },
        }
    );

    await this.updateDatabaseToRemoveVotedUsers(discussion);
    await Discussion.deleteOne({ _id: discussion._id.toString() });

    return [200, "Discussion removed!"];
}

exports.updateDatabaseToRemoveReply = async (discussion, userId) => {
    const response = await User.updateOne(
        { _id: userId },
        {
            $pull: {
                discussions: discussion._id.toString(),
            },
        }
    );

    if (response.nModified === 0) {
        return [400, "You can't remove this comment!"];
    }

    await Discussion.updateOne(
        { _id: discussion.reference },
        {
            $pull: {
                replies: discussion._id.toString(),
            },
        }
    );

    await this.updateDatabaseToRemoveVotedUsers(discussion);
    await Discussion.deleteOne({ _id: discussion._id.toString() });

    return [200, "Reply removed!"];
}

exports.updateDatabaseToRemoveVotedUsers = async (discussion) => {
    await User.updateMany(
        { _id: { $in: discussion.upvotedUsers } },
        {
            $pull: {
                upvotedDiscussions: discussion._id.toString(),
            },
        }
    );

    await User.updateMany(
        { _id: { $in: discussion.downvotedUsers } },
        {
            $pull: {
                downvotedDiscussions: discussion._id.toString(),
            },
        }
    );
}