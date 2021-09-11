const User = require("../../model/user_schema");
const Question = require("../../model/question_schema");

exports.addQuestion = async (req, res) => {
    const userId = req.userId;
    const userDetails = req.userDetails;
    const question = req.body.question;
    const userName = userDetails.name;
    const userProfile = userDetails.profilePicture;

    if (!question) {
        return res.status(400).json({
            error: `You can't post empty question!`,
        });
    }

    try {
        const questionInstance = new Question({ user: userId, question, upvotes: 0, userName, userProfile, timestamp: Date.now() });
        await questionInstance.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                questions: questionInstance._id.toString(),
            }
        });

        return res.status(200).json({
            question: questionInstance,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}