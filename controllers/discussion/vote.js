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
        switch (typeOfVote) {
            case '1':
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

        const discussionDetails = await Discussion.findOne({ _id: discussionId });

        return res.status(200).json({
            reactions: discussionDetails.reactions
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}