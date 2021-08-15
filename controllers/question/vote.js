const Question = require("../../model/question_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const questionId = req.body.questionId;
    const userId = req.userId;
    const typeOfVote = req.params.key;

    if (!questionId) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        switch (typeOfVote) {
            case '1':
                await Question.updateOne(
                    { _id: questionId }, {
                    $push: {
                        upvotedUsers: userId,
                    },
                    $inc: {
                        reactions: 1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $push: {
                        upvotedQuestions: questionId,
                    }
                });
                break;
            case '2':
                await Question.updateOne(
                    { _id: questionId }, {
                    $pull: {
                        upvotedUsers: userId,
                    },
                    $inc: {
                        reactions: -1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $pull: {
                        upvotedQuestions: questionId,
                    }
                });
                break;
            case '3':
                await Question.updateOne(
                    { _id: questionId }, {
                    $push: {
                        downvotedUsers: userId,
                    },
                    $inc: {
                        reactions: -1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $push: {
                        downvotedQuestions: questionId,
                    }
                });
                break;
            case '4':
                await Question.updateOne(
                    { _id: questionId }, {
                    $pull: {
                        downvotedUsers: userId,
                    },
                    $inc: {
                        reactions: 1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $pull: {
                        downvotedQuestions: questionId,
                    }
                });
                break;

            default:
                break;
        }

        return res.status(200).json({
            message: `Question upvoted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}