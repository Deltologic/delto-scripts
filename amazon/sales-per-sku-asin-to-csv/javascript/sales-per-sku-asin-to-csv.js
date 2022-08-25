/**
 * Delto Scripts
 * Hub for open-source automation scripts.
 * https://github.com/Deltologic/delto-scripts
 *
 * Started and maintained by Deltologic. Supported by community.
 **/

import SellingPartner from "amazon-sp-api"
import { createObjectCsvWriter } from "csv-writer"

// Amazon required credentials to connect with SP-API
const REGION = 'eu' // The region to use for the SP API endpoints ("eu", "na" or "fe")
const REFRESH_TOKEN = '_REFRESH_TOKEN_'
const SELLING_PARTNER_APP_CLIENT_ID = '_SELLING_PARTNER_APP_CLIENT_ID_'
const SELLING_PARTNER_APP_CLIENT_SECRET = '_SELLING_PARTNER_APP_CLIENT_SECRET_'
const AWS_ACCESS_KEY_ID = '_AWS_ACCESS_KEY_ID_'
const AWS_SECRET_ACCESS_KEY = '_AWS_SECRET_ACCESS_KEY_'
const AWS_SELLING_PARTNER_ROLE = '_AWS_SELLING_PARTNER_ROLE_'

// Required parameters to make API call in the script
const MARKETPLACE_IDS = {'US': 'ATVPDKIKX0DER', 'CANADA': 'A2EUQ1WTGCTBG2'} // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const INTERVAL = '2021-09-01T00:00:00-07:00--2022-09-04T00:00:00-07:00' // dates to be considered in report (from -- to)
const GRANULARITY = 'Total' // grouping of order metrics, based on a unit of time (total == whole interval time)

// products settings
const PRODUCT_IDENTIFIER = 'asin' // "asin" or "sku"
const PRODUCTS = [
    'B0B16656Z2',
    'B09STGMJVK'
]

const CSV_HEADERS = [
    { id: PRODUCT_IDENTIFIER, title: PRODUCT_IDENTIFIER },
    { id: 'sales', title: 'sales' },
    { id: 'amount', title: 'amount' },
    { id: 'currency', title: 'currency' },
    { id: 'marketplace', title: 'marketplace' },
]

const csvWriter = createObjectCsvWriter({
    path: 'sales.csv',
    header: CSV_HEADERS
})

// Init connection with SP API
const sellingPartner = new SellingPartner({
    region: REGION,
    refresh_token: REFRESH_TOKEN,
    credentials: {
        SELLING_PARTNER_APP_CLIENT_ID,
        SELLING_PARTNER_APP_CLIENT_SECRET,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_SELLING_PARTNER_ROLE
    }
});

// for each marketplace and product get sales metric
for (const [country, marketplaceId] of Object.entries(MARKETPLACE_IDS)) {
    for (const product of PRODUCTS) {
        // call SP API for metrics https://developer-docs.amazon.com/sp-api/docs/sales-api-v1-reference
        const res = await sellingPartner.callAPI({
            operation: 'sales.getOrderMetrics',
            query: {
                marketplaceIds: marketplaceId,
                granularity: GRANULARITY,
                interval: INTERVAL,
                [PRODUCT_IDENTIFIER]: product
            }
        });

        // write received record to csv file
        await csvWriter.writeRecords([{
            [PRODUCT_IDENTIFIER]: product,
            sales: res[0]['unitCount'],
            amount: res[0]['totalSales']['amount'],
            currency: res[0]['totalSales']['currencyCode'],
            marketplace: country
        }])
    }
}

console.log('The sales.csv file was created successfully')
