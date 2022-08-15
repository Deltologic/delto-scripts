// Delto Scripts
// Hub for open-source automation scripts.
// https://github.com/Deltologic/delto-scripts

import AWS from 'aws-sdk'

// set connections details
const configSource = {
    profile: 'AWS_SOURCE_PROFILE_NAME',
    region: 'AWS_SOURCE_REGION_NAME',
    bucket: 'S3_SOURCE_BUCKET_NAME'
}
const configDestination = {
    profile: 'AWS_DESTINATION_PROFILE_NAME',
    region: 'AWS_DESTINATION_REGION_NAME',
    bucket: 'S3_DESTINATION_BUCKET_NAME'
}

// configure AWS and create s3 connections instances
AWS.config.update({region: config.region})
const sourceCredentials = new AWS.SharedIniFileCredentials({profile: configSource.profile})
const destinationCredentials = new AWS.SharedIniFileCredentials({profile: configDestination.profile})
const s3Source = new AWS.S3({apiVersion: '2006-03-01', credentials: sourceCredentials})
const s3Destination = new AWS.S3({apiVersion: '2006-03-01', credentials: targetCredentials})

// set max number of concurrent connections
const pageSize = 50

async function script() {
    let token = undefined
    while (true) {
        // get next objects page from source
        const page = await s3Source.listObjectsV2({Bucket: configSource.bucket, ContinuationToken: token, MaxKeys: pageSize}).promise()

        // await concurrent migration
        await Promise.all(
            page.Contents.map(item => {
                // concurrently get each source object's details
                return {key: item.Key, objectPromise: s3Source.getObject({Bucket: configSource.bucket, Key: item.Key}).promise()}
            }).map(async ({key, objectPromise}) => {
                // (concurrently) wait for the source object to be retrieved
                const object = await objectPromise
                // concurrently upload objects to new bucket
                return s3Target.putObject({
                    Bucket: target.bucket, 
                    Key: key, ContentType: object.ContentType, Metadata: object.Metadata, 
                    Body: object.Body
                }).promise()
            })
        )

        // set next page token or stop the loop
        if (page.IsTruncated === true) {
            token = page.NextContinuationToken
        } else {
            break
        }
    }
}

await script()
