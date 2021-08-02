const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
require('dotenv').config();

const bucketNameUpload = process.env.AWS_BUCKET_NAME_UPLOAD
const bucketNameDownload = process.env.AWS_BUCKET_NAME_DOWNLOAD
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

exports.uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketNameUpload,
        Body: fileStream,
        Key: file.filename
    }

    fs.close(fileStream);

    return s3.upload(uploadParams).promise()
}

exports.getFileStream = (fileKey) => {

    const downloadParams = {
        Key: fileKey,
        Bucket: bucketNameDownload
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.removeFile = (fileKey) => {

    const deleteParams = {
        Key: fileKey,
        Bucket: bucketNameDownload
    }

    return s3.deleteObject(deleteParams).promise()
}