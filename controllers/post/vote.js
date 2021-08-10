const Post = require("../../model/post_schema");
const User = require("../../model/user_schema");

exports.vote = async (req, res) => {

    const postId = req.params.key;
    const userId = req.userId;
    const typeOfVote = req.body.type;

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
        const reactions = postDetails.upvotedUsers.length - postDetails.downvotedUsers.length;

        return res.status(200).json({
            reactions: reactions
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}