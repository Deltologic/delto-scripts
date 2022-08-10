# Amazon SP API - Lowest price offers to CSV
## Description
A simple script that takes lowest price offers for product (specified by ASIN) from given Amazon Marketplace and exports them to a CSV file.
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
If you want to change marketplace, product and its condition, edit this parameters
```javascript
const MARKETPLACE_ID = 'A1C3SOZRARQ6R3' // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const ASIN = 'B08H98GVK8' // PS5 Digital
const ITEM_CONDITION = 'New' // Possible values: New, Used, collectible, Refurbished, Club
```

### Other methods for prices
Other methods can be found here: https://developer-docs.amazon.com/sp-api/docs/product-pricing-api-v0-reference

## Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run script, type
```shell
node offers-to-csv.js
```
If there was any offer, `offers.csv` file will be created

_Contributions are welcome_
