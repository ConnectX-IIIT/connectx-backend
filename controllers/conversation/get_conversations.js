const Conversation = require("../../model/conversation_schema");
const Group = require("../../model/group_schema");

exports.getConversations = async (req, res) => {
    const conversationIds = req.body.conversationIds;
    const batch = req.body.batch;
    const joiningYear = req.body.joiningYear;

    try {
        const conversations = await Conversation.find({ _id: { $in: conversationIds } });
        const group = await Group.findOne({ name: batch + "-" + joiningYear });

        return res.status(200).json({
            conversations,
            group
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}