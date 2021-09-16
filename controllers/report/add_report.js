const Report = require("../../model/report_schema");
const User = require("../../model/user_schema");
const Post = require("../../model/post_schema");
const Question = require("../../model/question_schema");

exports.addReport = async (req, res) => {
    const userId = req.userId;
    const userDetails = req.userDetails;
    const type = req.body.type;
    const description = req.body.description;
    const reference = req.params.referenceId;

    if (userDetails.reports.includes(reference)) {
        return res.status(400).json({
            error: `Already reported!`,
        });
    }

    try {
        const report = new Report({ user: userId, description, reference, type, timestamp: Date.now(), isResolved: false });
        await report.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                reports: report._id.toString(),
            }
        });

        switch (type) {
            case 'post':
                await Post.updateOne(
                    { _id: reference }, {
                    $push: {
                        reports: report._id.toString(),
                    }
                });
                break;

            case 'question':
                await Question.updateOne(
                    { _id: reference }, {
                    $push: {
                        reports: report._id.toString(),
                    }
                });
                break;

            default:
                break;
        }

        return res.status(200).json({
            message: `Report added successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}