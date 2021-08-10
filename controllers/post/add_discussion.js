const Discussion = require("../../model/discussion_schema");
const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.addDiscussion = async (req, res) => {
    const postId = req.body.postId;
    const userId = req.userId;
    const reference = req.body.reference;
    const content = req.body.content;

    if (!content) {
        return res.status(400).json({
            error: `You can't post empty discussion!`,
        });
    }

    try {
        const discussion = new Discussion({ user: userId, postId, reference, content, timestamp: Date.now() });
        await discussion.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                discussions: discussion._id.toString(),
            }
        });

        if (reference == "") {
            await Post.updateOne(
                { _id: postId }, {
                $push: {
                    discussions: discussion._id.toString(),
                }
            });
        } else {
            await Discussion.updateOne(
                { _id: reference }, {
                $push: {
                    replies: discussion._id.toString(),
                }
            });
        }

        return res.status(200).json({
            discussion,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}