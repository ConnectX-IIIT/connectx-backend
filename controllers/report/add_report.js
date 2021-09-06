const Report = require("../../model/report_schema");
const User = require("../../model/user_schema");

exports.addReport = async (req, res) => {
    const userId = req.userId;
    const type = req.body.type;
    const description = req.body.description;
    const reference = req.params.referenceId;

    try {
        const report = new Report({ user: userId, description, reference, type, timestamp: Date.now(), isResolved: false });
        await report.save();

        await User.updateOne(
            { _id: userId }, {
            $push: {
                reports: report._id.toString(),
            }
        });

        return res.status(200).json({
            message: `Report added successfully!`,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}