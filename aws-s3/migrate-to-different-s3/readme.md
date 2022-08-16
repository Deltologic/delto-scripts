# Move all objects in the bucket from one bucket to another
## Description
Script template for migrating all S3 objects from one bucket to another. The second bucket may be in different AWS account than the first one.

## Getting started
Before runnig the script, you need to fill in the AWS connection information:
```js
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
```

## Languages
### JavaScript
#### Build
In order to download the dependencies type:
```shell
npm i
```

#### Build
In order to start the script type:
```shell
node script.js
```
