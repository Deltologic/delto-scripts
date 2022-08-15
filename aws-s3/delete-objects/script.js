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

// max number of concurrent requests
const numberOfWorkers = 50

async function script() {
    // concurrently count all selected objects
    const workers = []
    for (const key of toDelete) {
        // schedule current object deletion
        const worker = s3.deleteObject({  Bucket: source.bucket, Key: key }).promise()
        workers.push(worker)
        // await deletions
        while (workers.length > numberOfWorkers) {
            const worker = workers.pop()
            await worker
        }
    }
}

await script()
