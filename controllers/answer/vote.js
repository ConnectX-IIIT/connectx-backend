const Answer = require("../../model/answer_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const userId = req.userId;
    const userDetails = req.userDetails;
    const answerId = req.body.answerId;
    const typeOfVote = req.params.key;

    if (!answerId) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        switch (typeOfVote) {
            case '1':
                if (userDetails.upvotedAnswers.includes(answerId)) {
                    return res.status(401).json({
                        error: 'Already upvoted!'
                    })
                }

                await Answer.updateOne(
                    { _id: answerId }, {
                    $push: {
                        upvotedUsers: userId,
                    },
                    $inc: {
                        upvotes: 1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $push: {
                        upvotedAnswers: answerId,
                    }
                });
                break;

            case '2':
                if (!userDetails.upvotedAnswers.includes(answerId)) {
                    return res.status(401).json({
                        error: 'Not upvoted!'
                    })
                }

                await Answer.updateOne(
                    { _id: answerId }, {
                    $pull: {
                        upvotedUsers: userId,
                    },
                    $inc: {
                        upvotes: -1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $pull: {
                        upvotedAnswers: answerId,
                    }
                });
                break;

            case '3':
                if (userDetails.downvotedAnswers.includes(answerId)) {
                    return res.status(401).json({
                        error: 'Already downvoted!'
                    })
                }

                await Answer.updateOne(
                    { _id: answerId }, {
                    $push: {
                        downvotedUsers: userId,
                    },
                    $inc: {
                        upvotes: -1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $push: {
                        downvotedAnswers: answerId,
                    }
                });
                break;

            case '4':
                if (!userDetails.downvotedAnswers.includes(answerId)) {
                    return res.status(401).json({
                        error: 'Not downvoted!'
                    })
                }

                await Answer.updateOne(
                    { _id: answerId }, {
                    $pull: {
                        downvotedUsers: userId,
                    },
                    $inc: {
                        upvotes: 1
                    }
                });

                await User.updateOne(
                    { _id: userId }, {
                    $pull: {
                        downvotedAnswers: answerId,
                    }
                });
                break;

            default:
                break;
        }

        return res.status(200).json({
            message: `Answer upvoted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}