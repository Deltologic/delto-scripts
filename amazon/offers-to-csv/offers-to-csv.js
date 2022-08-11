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
const REGION = 'eu' // The region to use for the SP-API endpoints ("eu", "na" or "fe")
const REFRESH_TOKEN = '_REFRESH_TOKEN_'
const SELLING_PARTNER_APP_CLIENT_ID = '_SELLING_PARTNER_APP_CLIENT_ID_'
const SELLING_PARTNER_APP_CLIENT_SECRET = '_SELLING_PARTNER_APP_CLIENT_SECRET_'
const AWS_ACCESS_KEY_ID = '_AWS_ACCESS_KEY_ID_'
const AWS_SECRET_ACCESS_KEY = '_AWS_SECRET_ACCESS_KEY_'
const AWS_SELLING_PARTNER_ROLE = '_AWS_SELLING_PARTNER_ROLE_'

// Required parameters to make API call in the script
const MARKETPLACE_ID = 'A1C3SOZRARQ6R3' // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const ASIN = 'B08H98GVK8' // PS5 Digital
const ITEM_CONDITION = 'New' // Possible values: New, Used, collectible, Refurbished, Club

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

// Get lowest pricing for item
// more methods and parameters can be found here: https://developer-docs.amazon.com/sp-api/docs/product-pricing-api-v0-reference
const res = await sellingPartner.callAPI({
    operation: 'productPricing.getItemOffers',
    path: {
        Asin: ASIN
    },
    query: {
        MarketplaceId: MARKETPLACE_ID,
        ItemCondition: ITEM_CONDITION
    }
});

if (res['Offers'].length === 0) {
    console.log('No offers found, i\'m not generating offers.csv file')

    process.exit()
}

const csvHeaders = [
    { id: 'ListingPrice', title: 'ListingPrice'},
    { id: 'Shipping', title: 'Shipping'},
    { id: 'TotalCost', title: 'TotalCost'},
    { id: 'ShippingTimeMinimum', title: 'ShippingTimeMinimum'},
    { id: 'ShippingTimeMaximum', title: 'ShippingTimeMaximum'},
    { id: 'ShipsFrom', title: 'ShipsFrom'},
    { id: 'SellerId', title: 'SellerId'}
]

const csvWriter = createObjectCsvWriter({
    path: 'offers.csv',
    header: csvHeaders
})

await csvWriter.writeRecords(res['Offers'].map((offer) => ({
    ListingPrice: `${offer['ListingPrice']['CurrencyCode']} ${offer['ListingPrice']['Amount']}`,
    Shipping: `${offer['Shipping']['CurrencyCode']} ${offer['Shipping']['Amount']}`,
    TotalCost: `${offer['Shipping']['CurrencyCode']} ${offer['Shipping']['Amount'] + offer['Shipping']['Amount']}`,
    ShippingTimeMinimum: offer['ShippingTime']['minimumHours'],
    ShippingTimeMaximum: offer['ShippingTime']['maximumHours'],
    ShipsFrom: offer['ShipsFrom']['Country'],
    SellerId: offer['SellerId']
})))

console.log('The offers.csv file was created successfully')
