const Conversation = require("../../model/conversation_schema");

exports.getConversations = async (req, res) => {
    const conversationIds = req.body.conversationIds;

    try {
        const conversations = await Conversation.find({ _id: { $in: conversationIds } });

        return res.status(200).json({
            conversations,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}