// Delto Scripts
// Hub for open-source automation scripts.
// https://github.com/Deltologic/delto-scripts

import AWS from 'aws-sdk'

// set connection details
const config = {
    profile: 'AWS_PROFILE_NAME',
    region: 'AWS_REGION_NAME',
    bucket: 'S3_BUCKET_NAME'
}

// configure AWS and create s3 connection instance
AWS.config.update({region: config.region})
const creadentials = new AWS.SharedIniFileCredentials({profile: config.profile})
const s3 = new AWS.S3({apiVersion: '2006-03-01', credentials: creadentials})

// keys of objects to delete
const toDelete = ['key1']

async function script() {
    // iteratively count all selected objects
    for(const key of toDelete) {
        await s3.deleteObject({  Bucket: source.bucket, Key: key }).promise()
    }
}

await script()
