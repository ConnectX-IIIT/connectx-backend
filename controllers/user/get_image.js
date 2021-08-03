const { getFileStream } = require("../../configs/aws_s3");

exports.getImage = async (req, res) => {
    try {

        const key = req.params.key;
        const readStream = await getFileStream(key);

        if (readStream != null) {
            readStream.pipe(res);
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