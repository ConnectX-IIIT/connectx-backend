const Comment = require("../../model/comment_schema");
const Answer = require("../../model/answer_schema");
const User = require("../../model/user_schema");

exports.addComment = async (req, res) => {
    const userId = req.userId;
    const userDetails = req.userDetails;
    const answerId = req.body.answerId;
    const reference = req.body.reference;
    const content = req.body.content;

    if (!content) {
        return res.status(400).json({
            error: `You can't post empty comment!`,
        });
    }

    try {
        const comment = new Comment({ user: userId, userName: userDetails.name, userProfile: userDetails.profilePicture, reactions: 0, answerId, reference, content, timestamp: Date.now() });
        await comment.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                comments: comment._id.toString(),
            }
        });

        if (reference == "") {
            await Answer.updateOne(
                { _id: answerId }, {
                $push: {
                    comments: comment._id.toString(),
                }
            });
        } else {
            await Comment.updateOne(
                { _id: reference }, {
                $push: {
                    replies: comment._id.toString(),
                }
            });
        }

        return res.status(200).json({
            comment,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}