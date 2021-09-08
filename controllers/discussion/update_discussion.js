const Discussion = require("../../model/discussion_schema");

exports.updateDiscussion = async (req, res) => {

    const userDetails = req.userDetails;
    const discussionId = req.params.discussionId;
    const content = req.body.content;

    if (!content) {
        return res.status(400).json({
            error: `You can't post empty discussion!`,
        });
    }

    if (!userDetails.discussions.includes(discussionId)) {
        return res.status(401).json({
            error: `You can't edit this discussion!`,
        });
    }

    try {
        await Discussion.updateOne(
            { _id: discussionId }, {
            $set: {
                content,
            }
        });

        return res.status(200).json({
            message: `Discussion updated successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}