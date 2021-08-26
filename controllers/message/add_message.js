const Conversation = require("../../model/conversation_schema");
const Group = require("../../model/group_schema");
const Message = require("../../model/message_schema");

exports.addMessage = async (req, res) => {
    const userId = req.userId;
    const message = req.body.message;
    const userName = req.body.name;
    const conversationId = req.params.key;
    const reference = req.body.reference;
    const isGroup = req.body.isGroup;

    if (!message) {
        return res.status(400).json({
            error: `You can't post empty question!`,
        });
    }

    try {
        const messageInstance = new Message({ userId, message, userName, reference, conversationId });
        await messageInstance.save();

        if (isGroup) {
            await Group.updateOne(
                { _id: conversationId }, {
                $set: {
                    lastMessage: message,
                    lastModified: Date.now(),
                }
            });
        } else {
            await Conversation.updateOne(
                { _id: conversationId }, {
                $set: {
                    lastMessage: message,
                    lastModified: Date.now(),
                }
            });
        }

        return res.status(200).json({
            message: messageInstance,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}