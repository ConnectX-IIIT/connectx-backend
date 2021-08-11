const Discussion = require("../../model/discussion_schema");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");
const { removeFile } = require("../../configs/aws_s3");

exports.removePost = async (req, res) => {
    const postId = req.params.key;
    const userId = req.userId;

    try {
        const response = await User.updateOne(
            { _id: userId },
            {
                $pull: {
                    posts: postId,
                },
            }
        );

        if (response.nModified === 0) {
            return res.status(400).json({
                error: `You can't remove this post!`,
            });
        }

        const post = await Post.findOne({ _id: postId });

        for (let img of post.attachedImages) {
            await removeFile(img);
        }

        await User.updateMany(
            { _id: { $in: post.upvotedUsers } },
            {
                $pull: {
                    upvotedPosts: postId,
                },
            }
        );

        await User.updateMany(
            { _id: { $in: post.downvotedUsers } },
            {
                $pull: {
                    downvotedPosts: postId,
                },
            }
        );

        await Post.deleteOne({ _id: postId });
        const discussions = await Discussion.find({ _id: { $in: post.discussions } });

        for (let discussion of discussions) {
            await User.updateOne(
                { _id: discussion.user },
                {
                    $pull: {
                        discussions: discussion._id,
                    },
                }
            );

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
        }

        await Discussion.deleteMany({ _id: { $in: post.discussions } });

        return res.status(200).json({
            message: `Post removed!`,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
};
