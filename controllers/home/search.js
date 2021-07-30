const Question = require("../../model/question_schema");
const User = require("../../model/user_schema");

exports.search = async (req, res) => {

    const searchString = req.params.key;

    try {
        let regex = new RegExp(searchString, 'i');
        let users = await User.find({ name: regex });
        let questions = await Question.find({ question: regex });

        return res.status(200).json({
            userData: users,
            questionData: questions
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occcured!`
        })
    }
}