const Question = require("../../model/question_schema");
const User = require("../../model/user_schema");

exports.removeQuestion = async (req, res) => {

    const questionId = req.params.key;
    const userId = req.userId;

    try {
        const question = await Question.findOne({ _id: questionId });

        const response = await User.updateOne(
            { _id: userId },
            {
                $pull: {
                    questions: questionId,
                },
            }
        );

        if (response.nModified === 0) {
            return res.status(400).json({
                error: `You can't remove this question!`,
            });
        }

        await User.updateMany(
            { _id: { $in: question.upvotedUsers } },
            {
                $pull: {
                    upvotedQuestions: questionId,
                },
            }
        );

        await User.updateMany(
            { _id: { $in: question.downvotedUsers } },
            {
                $pull: {
                    downvotedQuestions: questionId,
                },
            }
        );

        await Question.deleteOne({ _id: questionId });

        return res.status(200).json({
            message: `Question removed!`,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`,
        });
    }
}