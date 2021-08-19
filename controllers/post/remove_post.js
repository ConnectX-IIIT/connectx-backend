const Discussion = require("../../model/discussion_schema");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");
const cloudinary = require("../../configs/cloudinary");
const { updateDatabaseToRemoveDiscussion } = require("../discussion/remove_discussion");

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
            let publicId = img.substring(img.lastIndexOf('/') + 1, img.lastIndexOf('.'));
            await cloudinary.uploader.destroy(publicId);
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
            const removeDiscussionRes = await updateDatabaseToRemoveDiscussion(discussion, discussion.user);

            if (removeDiscussionRes[0] != 200) {
                return res.status(401).json({
                    error: `You can't remove this comment!`,
                });
            }
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
