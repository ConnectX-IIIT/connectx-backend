const Comment = require("../../model/comment_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const userId = req.userId;
    const userDetails = req.userDetails;
    const commentId = req.body.commentId;
    const typeOfVote = req.params.key;

    if (!commentId) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        switch (typeOfVote) {
            case '1':
                if (userDetails.upvotedComments.includes(commentId)) {
                    return res.status(401).json({
                        error: 'Already upvoted!'
                    })
                }

                await Comment.updateOne(
                    { _id: commentId }, {
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
                        upvotedComments: commentId,
                    }
                });
                break;

            case '2':
                if (!userDetails.upvotedComments.includes(commentId)) {
                    return res.status(401).json({
                        error: 'Not upvoted!'
                    })
                }

                await Comment.updateOne(
                    { _id: commentId }, {
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
                        upvotedComments: commentId,
                    }
                });
                break;

            case '3':
                if (userDetails.downvotedComments.includes(commentId)) {
                    return res.status(401).json({
                        error: 'Already downvoted!'
                    })
                }

                await Comment.updateOne(
                    { _id: commentId }, {
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
                        downvotedComments: commentId,
                    }
                });
                break;

            case '4':
                if (!userDetails.downvotedComments.includes(commentId)) {
                    return res.status(401).json({
                        error: 'Not downvoted!'
                    })
                }

                await Comment.updateOne(
                    { _id: commentId }, {
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
                        downvotedComments: commentId,
                    }
                });
                break;

            default:
                break;
        }

        return res.status(200).json({
            message: `Comment upvoted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}