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


async function script() {
    // utility variables
    let n = 0
    let token = undefined

    // set the desired page length (max: 1_000)
    const maxKeys = 1_000
    
    // iteratively count all objects in the bucket
    while(true) {
        // fetch next page and update the count
        const page = await s3.listObjectsV2({Bucket: config.bucket, ContinuationToken: token, MaxKeys: maxKeys}).promise()
        n += page.Contents.length

        // log current information
        console.log(`${new Date().toISOString()} Page: n=${n}, page=${page.Contents.length}`)

        // finish iterating if there is no mote objects
        if (page.IsTruncated === true) {
            token = page.NextContinuationToken
        } else {
            break
        }
    }

    console.log(n)
}

await script()
