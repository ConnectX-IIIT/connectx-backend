const User = require("../../model/user_schema");
const Conversation = require("../../model/conversation_schema");

exports.addConversation = async (req, res) => {
    const userId = req.userId;
    const userIds = req.body.userIds;
    const userProfiles = req.body.userProfiles;
    const userNames = req.body.userNames;

    try {
        const conversation = new Conversation({ userIds, userProfiles, userNames });
        await conversation.save();

        await User.updateOne(
            { _id: userId }, {
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