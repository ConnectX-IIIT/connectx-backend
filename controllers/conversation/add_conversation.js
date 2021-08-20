const User = require("../../model/user_schema");
const Conversation = require("../../model/conversation_schema");

exports.addConversation = async (req, res) => {
    const userIds = req.body.userIds;

    try {
        const conversation = new Conversation({ userIds });
        await conversation.save();

        await User.updateMany(
            { _id: { $in: userIds } }, {
            $push: {
                conversations: conversation._id.toString(),
            }
        });

        return res.status(200).json({
            message: `Conversation added successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}