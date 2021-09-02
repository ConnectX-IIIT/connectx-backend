const Comment = require("../../model/comment_schema");
const Answer = require("../../model/answer_schema");
const User = require("../../model/user_schema");
const { updateDatabaseToRemoveComment } = require("../comment/remove_comment");

exports.removeAnswer = async (req, res) => {
    const answerId = req.params.key;
    const userId = req.userId;

    try {
        const response = await User.updateOne(
            { _id: userId },
            {
                $pull: {
                    answers: answerId,
                },
            }
        );

        if (response.nModified === 0) {
            return res.status(400).json({
                error: `You can't remove this answer!`,
            });
        }

        const answer = await Answer.findOne({ _id: answerId });

        await User.updateMany(
            { _id: { $in: answer.upvotedUsers } },
            {
                $pull: {
                    upvotedAnswers: answerId,
                },
            }
        );

        await User.updateMany(
            { _id: { $in: answer.downvotedUsers } },
            {
                $pull: {
                    downvotedAnswers: answerId,
                },
            }
        );

        await Answer.deleteOne({ _id: answerId });

        if (answer.comments.length !== 0) {
            const comments = await Comment.find({ _id: { $in: answer.comments } });

            for (let comment of comments) {
                const removeCommentRes = await updateDatabaseToRemoveComment(comment, comment.user);

                if (removeCommentRes[0] != 200) {
                    return res.status(401).json({
                        error: `You can't remove this comment!`,
                    });
                }
            }
        }

        await Comment.deleteMany({ _id: { $in: answer.comments } });

        return res.status(200).json({
            message: `Answer removed!`,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
};
