const Message = require("../../model/message_schema");

exports.addMessage = async (req, res) => {
    const userId = req.userId;
    const message = req.body.message;
    const conversationId = req.params.key;
    const reference = req.body.reference;

    if (!message) {
        return res.status(400).json({
            error: `You can't post empty question!`,
        });
    }

    try {
        const messageInstance = new Message({ userId, message, reference, conversationId });
        await messageInstance.save();

        return res.status(200).json({
            message: messageInstance,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}