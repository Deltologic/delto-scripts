# Concurrently delete selected objects from S3 bucket
## Description
Script template for concurrently deleting S3 objects by list of their ids

## Getting started [remove if no pre-start steps are necessary]
Before runnig the script, you need to fill in the AWS connectin information:
```js
const config = {
    profile: 'AWS_PROFILE_NAME',
    region: 'AWS_REGION_NAME',
    bucket: 'S3_BUCKET_NAME'
}
```

## Languages
### JavaScript
#### Build
In oder to download the dependencies type:
```shell
npm i
```

#### Build
In oder to download start the scripts type:
```shell
node script.js
```
