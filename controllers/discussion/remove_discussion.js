const User = require("../../model/user_schema");

exports.removeDiscussion = async (req, res) => {

    const discussionId = req.params.key;
    const userId = req.userId;

    try {
        const response = await User.updateOne(
            { _id: userId },
            {
                $pull: {
                    discussions: discussionId,
                },
            }
        );

        if (response.nModified === 0) {
            return res.status(400).json({
                error: `You can't remove this comment!`,
            });
        }

        const discussion = await Discussion.find({ _id: discussionId });

        await User.updateMany(
            { _id: { $in: discussion.upvotedUsers } },
            {
                $pull: {
                    upvotedDiscussions: discussion._id,
                },
            }
        );

        await User.updateMany(
            { _id: { $in: discussion.downvotedUsers } },
            {
                $pull: {
                    downvotedDiscussions: discussion._id,
                },
            }
        );

        await Discussion.deleteOne({ _id: discussionId });

        return res.status(200).json({
            message: `Post removed!`,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
}