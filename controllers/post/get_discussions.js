const Discussion = require("../../model/discussion_schema");

exports.getDiscussions = async (req, res) => {
    const discussionIds = req.body.discussionIds;

    if (discussionIds.length === 0) {
        return res.status(200).json({
            discussions: []
        });
    }

    try {
        const discussions = await Discussion.find({ _id: { $in: discussionIds } }).sort({ "timestamp": -1 });

        return res.status(200).json({
            discussions
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}