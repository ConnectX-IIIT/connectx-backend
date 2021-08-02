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
        Key: file.filename
    }

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