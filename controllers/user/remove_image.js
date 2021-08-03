const { removeFile } = require("../../configs/aws_s3");

exports.removeImage = async (req, res) => {

    try {
        const key = req.params.key;
        const result = await removeFile(key);

        if (result != null) {
            res.status(200).send('File removed successfully!');
        } else {
            return res.status(400).json({
                error: `File not found!`
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
}