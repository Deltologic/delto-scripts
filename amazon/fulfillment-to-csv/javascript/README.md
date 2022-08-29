# Amazon SP API - Inventory fulfillment to CSV
## Description
A simple script that takes inventory fulfillment (all or based on given SKUs) from your Amazon account
and exports them to a CSV file.
## Languages
### Javascript (Node.js)
#### Dependencies
- [amazon-sp-api](https://www.npmjs.com/package/amazon-sp-api)
- [csv-writer](https://www.npmjs.com/package/csv-writer)

## Connection to SP API configuration
### Credentials
You need to change the following variables (credentials) to those assigned to your SP API account in `config.json` file
```json
{
  "REGION": "na",
  "REFRESH_TOKEN": "_REFRESH_TOKEN_",
  "SELLING_PARTNER_APP_CLIENT_ID": "_SELLING_PARTNER_APP_CLIENT_ID_",
  "SELLING_PARTNER_APP_CLIENT_SECRET": "_SELLING_PARTNER_APP_CLIENT_SECRET_",
  "AWS_ACCESS_KEY_ID": "_AWS_ACCESS_KEY_ID_",
  "AWS_SECRET_ACCESS_KEY": "_AWS_SECRET_ACCESS_KEY_",
  "AWS_SELLING_PARTNER_ROLE": "_AWS_SELLING_PARTNER_ROLE_"
}
```
[If you're having trouble getting this data, you can use the Deltologic CEO's video,
where he shows you how to properly set up your account](https://youtu.be/bHBFElmWRNg)
### Query parameters
In case you want to change marketplaces or products, replace
the value of below in `config.json`. If `sellerSkus` is empty, all products from your Amazon account
will be proceeded.
```json
{
  "marketplace_ids": {
    "US": "ATVPDKIKX0DER",
    "CANADA": "A2EUQ1WTGCTBG2"
  },
  "sellerSkus" : [
    "NOT-EXISTING-SKU"
  ]
}
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
