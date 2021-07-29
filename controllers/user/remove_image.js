const { removeFile } = require("../../configs/aws_s3");

exports.removeImage = async (req, res) => {

    const key = req.params.key;
    await removeFile(key);
    res.send('File removed successfully!')
}