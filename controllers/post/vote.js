const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const postId = req.body.postId;
    const userId = req.userId;
    const userDetails = req.userDetails;
    const typeOfVote = req.params.key;

    if (!postId) {
        return res.status(400).json({
            error: "Server error occured!"
        })
    }

    try {
        switch (typeOfVote) {
            case '1':
                if (userDetails.upvotedPosts.includes(postId)) {
                    return res.status(401).json({
                        error: 'Already upvoted!'
                    })
                }

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
            case '2':
                if (!userDetails.upvotedPosts.includes(postId)) {
                    return res.status(401).json({
                        error: 'Not upvoted!'
                    })
                }

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
            case '3':
                if (userDetails.downvotedPosts.includes(postId)) {
                    return res.status(401).json({
                        error: 'Already downvoted!'
                    })
                }

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
            case '4':
                if (!userDetails.downvotedPosts.includes(postId)) {
                    return res.status(401).json({
                        error: 'Not downvoted!'
                    })
                }

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

        return res.status(200).json({
            message: `Post upvoted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}