const Report = require("../../model/report_schema");

exports.getReports = async (req, res) => {

    try {
        const reports = await Report.find().sort({ timestamp: -1 });

        return res.status(200).json({
            reports,
        });

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}