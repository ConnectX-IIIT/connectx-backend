const Discussion = require("../../model/discussion_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const discussionId = req.body.discussionId;
    const userId = req.userId;
    const typeOfVote = req.params.key;

    if (!discussionId) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        const userDetails = await User.findOne({ _id: userId });

        switch (typeOfVote) {
            case '1':
                if (userDetails.upvotedDiscussions.includes(discussionId)) {
                    return res.status(401).json({
                        error: 'Already upvoted!'
                    })
                }

                await Discussion.updateOne(
                    { _id: discussionId }, {
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
                        upvotedDiscussions: discussionId,
                    }
                });
                break;

            case '2':
                if (!userDetails.upvotedDiscussions.includes(discussionId)) {
                    return res.status(401).json({
                        error: 'Not upvoted!'
                    })
                }

                await Discussion.updateOne(
                    { _id: discussionId }, {
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
                        upvotedDiscussions: discussionId,
                    }
                });
                break;

            case '3':
                if (userDetails.downvotedDiscussions.includes(discussionId)) {
                    return res.status(401).json({
                        error: 'Already downvoted!'
                    })
                }

                await Discussion.updateOne(
                    { _id: discussionId }, {
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
                        downvotedDiscussions: discussionId,
                    }
                });
                break;

            case '4':
                if (!userDetails.downvotedDiscussions.includes(discussionId)) {
                    return res.status(401).json({
                        error: 'Not downvoted!'
                    })
                }

                await Discussion.updateOne(
                    { _id: discussionId }, {
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
                        downvotedDiscussions: discussionId,
                    }
                });
                break;

            default:
                break;
        }

        return res.status(200).json({
            message: `Discussion upvoted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}