/**
 * Delto Scripts
 * Hub for open-source automation scripts.
 * https://github.com/Deltologic/delto-scripts
 *
 * Started and maintained by Deltologic. Supported by community.
 **/

import SellingPartner from "amazon-sp-api"
import { createObjectCsvWriter } from "csv-writer"
import { readFileSync } from "fs"

// read config file with required credentials
const CONFIG = JSON.parse(readFileSync('config.json', 'utf8'))
const CREDENTIALS = CONFIG['sp_api_credentials']

const csvHeaders = [
    { id: 'SKU', title: 'SKU' },
    { id: 'stock', title: 'stock' },
    { id: 'condition', title: 'condition' },
    { id: 'marketplace', title: 'marketplace' }
]

const csvWriter = createObjectCsvWriter({
    path: 'fulfillment.csv',
    header: csvHeaders
})

// Init connection with SP API
const sellingPartner = new SellingPartner({
    region: CREDENTIALS['REGION'],
    refresh_token: CREDENTIALS['REFRESH_TOKEN'],
    credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: CREDENTIALS['SELLING_PARTNER_APP_CLIENT_ID'],
        SELLING_PARTNER_APP_CLIENT_SECRET: CREDENTIALS['SELLING_PARTNER_APP_CLIENT_SECRET'],
        AWS_ACCESS_KEY_ID: CREDENTIALS['AWS_ACCESS_KEY_ID'],
        AWS_SECRET_ACCESS_KEY: CREDENTIALS['AWS_SECRET_ACCESS_KEY'],
        AWS_SELLING_PARTNER_ROLE: CREDENTIALS['AWS_SELLING_PARTNER_ROLE'],
    }
});

// for each marketplace and product get sales metric
for (const [country, marketplace] of Object.entries(CONFIG['marketplace_ids'])) {
    await callAPIAndAppendRecords(country, marketplace, csvWriter)
}

console.log('The fulfillment.csv file was created successfully')

async function callAPIAndAppendRecords(country, marketplace, csvWriter, nextToken = null) {
    // https://developer-docs.amazon.com/sp-api/docs/fbainventory-api-v1-reference
    const response = await sellingPartner.callAPI({
        operation: 'fbaInventory.getInventorySummaries',
        query: {
            granularityType: 'Marketplace',
            granularityId: marketplace,
            marketplaceIds: [marketplace],
            sellerSkus: CONFIG['sellerSkus'],
            nextToken: nextToken
        }
    })

    // append received records to CSV file
    await csvWriter.writeRecords(response['inventorySummaries'].map(summary => {
        return {
            SKU: summary['sellerSku'],
            stock: summary['totalQuantity'],
            condition: summary['condition'],
            marketplace: country
        }
    }))

    // if response has 'nextToken' key, there are more products we must process
    if (typeof response['nextToken'] === 'string' && response['nextToken'].length > 0) {
        await callAPIAndAppendRecords(country, marketplace, csvWriter, response['nextToken'])
    }
}
