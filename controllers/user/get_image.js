const { getFileStream } = require("../../configs/aws_s3");

exports.getImage = (req, res) => {

    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
}