const Answer = require("../../model/answer_schema");

exports.getAnswers = async (req, res) => {

    const userId = req.body.userId;
    const questionId = req.body.questionId;
    let answers;

    try {
        if (!questionId) {
            answers = await Answer.find({ user: userId }).sort({ "timestamp": -1 });
        } else {
            answers = await Answer.find({ questionId }).sort({ "upvotes": -1 });
        }

        return res.status(200).json({
            answers
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}