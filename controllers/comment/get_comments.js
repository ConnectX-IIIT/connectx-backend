const Comment = require("../../model/comment_schema");

exports.getComments = async (req, res) => {
    const commentIds = req.body.commentIds;

    let comments = [{
        comment: {},
        reply: []
    }];

    if (commentIds.length === 0) {
        return res.status(200).json({
            comments: []
        });
    }

    try {
        const commentData = await Comment.find({ _id: { $in: commentIds } }).sort({ "timestamp": -1 });

        for (let i = 0; i < commentData.length; i = i + 1) {

            let replyData = await Comment.find({ _id: { $in: commentData[i].replies } }).sort({ "timestamp": -1 });
            comments[i].comment = commentData[i];
            comments[i].reply = replyData;

            if (i !== commentData.length - 1) {
                comments[i + 1] = {
                    comment: {},
                    reply: []
                }
            }
        }

        return res.status(200).json({
            comments
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}