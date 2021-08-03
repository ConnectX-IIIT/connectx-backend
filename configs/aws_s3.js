const { S3 } = require("aws-sdk");
const fs = require('fs');
require('dotenv').config();

const bucketNameUpload = process.env.AWS_BUCKET_NAME_UPLOAD
const bucketNameDownload = process.env.AWS_BUCKET_NAME_DOWNLOAD
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

exports.uploadFile = (file, fileStream) => {

    const uploadParams = {
        Bucket: bucketNameUpload,
        Body: fileStream,
        Key: file.filename,
    }

    return s3.upload(uploadParams).promise()
}

exports.getFileStream = async (fileKey) => {

    try {
        const exists = await s3
            .headObject({
                Bucket: bucketNameDownload,
                Key: fileKey,
            })
            .promise()
            .then(
                () => true,
                err => {
                    if (err) {
                        return false;
                    }
                    throw err;
                }
            );

        if (exists) {

            const downloadParams = {
                Key: fileKey,
                Bucket: bucketNameDownload
            }
            return s3.getObject(downloadParams).createReadStream();

        } else {
            return null;
        }

    } catch (e) {
        return null;
    }
}

exports.removeFile = async (fileKey) => {

    try {
        const exists = await s3
            .headObject({
                Bucket: bucketNameDownload,
                Key: fileKey,
            })
            .promise()
            .then(
                () => true,
                error => {
                    if (error) {
                        return false;
                    }
                    throw err;
                }
            );

        if (exists) {

            const deleteParams = {
                Key: fileKey,
                Bucket: bucketNameDownload
            }
            return s3.deleteObject(deleteParams).promise();

        } else {
            return null;
        }

    } catch (e) {
        return null;
    }

}