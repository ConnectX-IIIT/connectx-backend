const Answer = require("../../model/answer_schema");

exports.updateAnswer = async (req, res) => {

    const userDetails = req.userDetails;
    const answerId = req.params.answerId;
    const answer = req.body.answer;

    if (!answer) {
        return res.status(400).json({
            error: `You can't post empty answer!`,
        });
    }

    if (!userDetails.answers.includes(answerId)) {
        return res.status(401).json({
            error: `You can't edit this answer!`,
        });
    }

    try {
        await Answer.updateOne(
            { _id: answerId }, {
            $set: {
                answer,
            }
        });

        return res.status(200).json({
            message: `Answer updated successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}