const Discussion = require("../../model/discussion_schema");

exports.getDiscussions = async (req, res) => {
    const discussionIds = req.body.discussionIds;

    let discussions = [{
        discussion: {},
        reply: []
    }];

    if (discussionIds.length === 0) {
        return res.status(200).json({
            discussions: []
        });
    }

    try {
        const discussionData = await Discussion.find({ _id: { $in: discussionIds } }).sort({ "timestamp": -1 });

        for (let i = 0; i < discussionData.length; i = i + 1) {

            let replyData = await Discussion.find({ _id: { $in: discussionData[i].replies } }).sort({ "timestamp": -1 });
            discussions[i].discussion = discussionData[i];
            discussions[i].reply = replyData;

            if (i !== discussionData.length - 1) {
                discussions[i + 1] = {
                    discussion: {},
                    reply: []
                }
            }
        }

        return res.status(200).json({
            discussions
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}