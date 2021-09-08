const Question = require("../../model/question_schema");

exports.updateQuestion = async (req, res) => {

    const userDetails = req.userDetails;
    const questionId = req.params.questionId;
    const question = req.body.question;

    if (!question) {
        return res.status(400).json({
            error: `You can't post empty question!`,
        });
    }

    if (!userDetails.questions.includes(questionId)) {
        return res.status(401).json({
            error: `You can't edit this question!`,
        });
    }

    try {
        await Question.updateOne(
            { _id: questionId }, {
            $set: {
                question,
            }
        });

        return res.status(200).json({
            message: `Question updated successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}