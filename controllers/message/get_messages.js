const Message = require("../../model/message_schema");

exports.getMessages = async (req, res) => {
    const conversationId = req.params.key;

    try {
        const messages = await Message.find({ conversationId });

        return res.status(200).json({
            messages,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}