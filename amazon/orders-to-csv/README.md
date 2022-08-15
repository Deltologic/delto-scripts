# Amazon SP API - Orders to CSV
## Description
A simple script that takes orders from your amazon account and exports them to a CSV file.
## Languages
### Javascript (Node.js)
#### Dependencies
- [amazon-sp-api](https://www.npmjs.com/package/amazon-sp-api)
- [csv-writer](https://www.npmjs.com/package/csv-writer)

## Connection to SP API configuration
### Credentials
You need to change the following variables (credentials) to those assigned to your SP API account
```javascript
const REGION = 'eu' // The region to use for the SP-API endpoints ("eu", "na" or "fe")
const REFRESH_TOKEN = '_REFRESH_TOKEN_'
const SELLING_PARTNER_APP_CLIENT_ID = '_SELLING_PARTNER_APP_CLIENT_ID_'
const SELLING_PARTNER_APP_CLIENT_SECRET = '_SELLING_PARTNER_APP_CLIENT_SECRET_'
const AWS_ACCESS_KEY_ID = '_AWS_ACCESS_KEY_ID_'
const AWS_SECRET_ACCESS_KEY = '_AWS_SECRET_ACCESS_KEY_'
const AWS_SELLING_PARTNER_ROLE = '_AWS_SELLING_PARTNER_ROLE_'
```
[If you're having trouble getting this data, you can use the Deltologic CEO's video,
where he shows you how to properly set up your account](https://youtu.be/bHBFElmWRNg)
### Query parameters
If you want to use other marketplaces and filter order date, change below values
```javascript
const MARKETPLACE_IDS = ['A1C3SOZRARQ6R3'] // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const ORDER_CREATED_AFTER = '2022-07-01' // required param, get order only after this date
```

## Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run script, type
```shell
node orders-to-csv.js
```
If there was any order, `orders.csv` file will be created

_Contributions are welcome_
