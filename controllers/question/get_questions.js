const Question = require("../../model/question_schema");

exports.getQuestions = async (req, res) => {

    const typeOfQuestions = req.params.key;
    const userId = req.body.userId;
    const questionId = req.body.questionId;
    let questions;

    try {
        if (userId) {
            questions = await Question.find({ user: userId }).sort({ "timestamp": -1 });
        } else if (questionId) {
            questions = await Question.findOne({ _id: questionId });
        } else {
            questions = await getQuestionsByType(typeOfQuestions);
        }

        return res.status(200).json({
            questions
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}

async function getQuestionsByType(type) {
    switch (type) {
        case '1':
            return Question.find().sort({ "timestamp": -1 });
        case '2':
            return Question.find().sort({ "upvotes": -1 });
        default:
            return [];
    }
}