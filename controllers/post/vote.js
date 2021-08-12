const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const postId = req.body.postId;
    const userId = req.userId;
    const typeOfVote = req.params.key;

    if (!typeOfVote) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        switch (typeOfVote) {
            case 1:
                await Post.updateOne(
                    { _id: postId }, {
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
                        upvotedPosts: postId,
                    }
                });
                break;
            case 2:
                await Post.updateOne(
                    { _id: postId }, {
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
                        upvotedPosts: postId,
                    }
                });
                break;
            case 3:
                await Post.updateOne(
                    { _id: postId }, {
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
                        downvotedPosts: postId,
                    }
                });
                break;
            case 4:
                await Post.updateOne(
                    { _id: postId }, {
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
                        downvotedPosts: postId,
                    }
                });
                break;

            default:
                break;
        }

        const postDetails = await Post.findOne({ _id: postId });

        return res.status(200).json({
            reactions: postDetails.reactions
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}