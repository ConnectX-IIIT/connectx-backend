const Discussion = require("../../model/discussion_schema");
const Post = require("../../model/post_schema");
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

        const discussion = await Discussion.findOne({ _id: discussionId });

        if (discussion.reference) {
            await Discussion.updateOne(
                { _id: discussion.reference },
                {
                    $pull: {
                        replies: discussionId,
                    },
                }
            );
        } else {
            const discussions = await Discussion.find({ _id: { $in: discussion.replies } });

            for (let discussion of discussions) {

                await User.updateOne(
                    { _id: discussion.user },
                    {
                        $pull: {
                            discussions: discussion._id.toString(),
                        },
                    }
                );

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


            await Discussion.deleteMany({ _id: { $in: discussion.replies } });

            await Post.updateMany(
                { _id: discussion.postId },
                {
                    $pull: {
                        discussions: discussionId,
                    },
                }
            );
        }

        await User.updateMany(
            { _id: { $in: discussion.upvotedUsers } },
            {
                $pull: {
                    upvotedDiscussions: discussionId,
                },
            }
        );

        await User.updateMany(
            { _id: { $in: discussion.downvotedUsers } },
            {
                $pull: {
                    downvotedDiscussions: discussionId,
                },
            }
        );

        await Discussion.deleteOne({ _id: discussionId });

        return res.status(200).json({
            message: `Discussion removed!`,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
}