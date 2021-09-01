const User = require("../../model/user_schema");
const Answer = require("../../model/answer_schema");

exports.addAnswer = async (req, res) => {
    const userId = req.userId;
    const userDetails = req.userDetails;
    const answer = req.body.answer;
    const questionId = req.params.questionId;
    const userName = userDetails.name;
    const userProfile = userDetails.profilePicture;

    if (!answer) {
        return res.status(400).json({
            error: `You can't post empty answer!`,
        });
    }

    try {
        const answerInstance = new Answer({ user: userId, answer, upvotes: 0, userName, userProfile, questionId, timestamp: Date.now() });
        await answerInstance.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                answers: answerInstance._id.toString(),
            }
        });

        return res.status(200).json({
            message: `Answer added successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}