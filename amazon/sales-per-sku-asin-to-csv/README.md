# Amazon SP API - Sales metrics by ASIN/SKU and Marketplace to CSV
## Description
A simple script that takes sales metrics for given period of time from your amazon account 
and exports them to a CSV file.
## Languages
### Javascript (Node.js)
#### Dependencies
- [amazon-sp-api](https://www.npmjs.com/package/amazon-sp-api)
- [csv-writer](https://www.npmjs.com/package/csv-writer)

## Connection to SP API configuration
### Credentials
You need to change the following variables (credentials) to those assigned to your SP API account
```javascript
const REGION = 'eu' // The region to use for the SP API endpoints ("eu", "na" or "fe")
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
In case you want to change marketplaces, interval time or granularity, change
the value of below variables
```javascript
const MARKETPLACE_IDS = {'US': 'ATVPDKIKX0DER', 'CANADA': 'A2EUQ1WTGCTBG2'} // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const INTERVAL = '2021-09-01T00:00:00-07:00--2022-09-04T00:00:00-07:00' // dates to be considered in report (from -- to)
const GRANULARITY = 'Total' // grouping of order metrics, based on a unit of time (total == whole interval time)
```

### Products settings
In case you want to change identifier (SKU/ASIN) and add more products to report,
edit below variables
```javascript
const PRODUCT_IDENTIFIER = 'asin' // "asin" or "sku"
const PRODUCTS = [
    'B0B16656Z2',
    'B09STGMJVK'
]
```
## Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run script, type
```shell
node sales-per-sku-asin-to-csv.js
```
For given marketplaces and products, `sales.csv` file will be created

_Contributions are welcome_