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
const MARKETPLACE_IDS = ['A1C3SOZRARQ6R3'] // take required from https://docs.developer.amazonservices.com/en_UK/dev_guide/DG_Endpoints.html
const ORDER_CREATED_AFTER = '2022-07-01' // required param, get order only after this date

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

// Get orders
const res = await sellingPartner.callAPI({
    operation: 'orders.getOrders',
    query: {
        MarketplaceIds: MARKETPLACE_IDS,
        CreatedAfter: ORDER_CREATED_AFTER
    }
});

if (res['Orders'].length > 0) {
    console.log('No orders found, i\'m not generating orders.csv file')

    process.exit()
}

const csvHeaders = [
    { id: 'AmazonOrderId', title: 'AmazonOrderId'},
    { id: 'PurchaseDate', title: 'PurchaseDate'},
    { id: 'OrderStatus', title: 'OrderStatus'},
    { id: 'OrderTotal', title: 'OrderTotal'},
    { id: 'PaymentMethod', title: 'PaymentMethod'},
    { id: 'MarketplaceId', title: 'MarketplaceId'},
    { id: 'ShipmentServiceLevelCategory', title: 'ShipmentServiceLevelCategory'},
    { id: 'OrderType', title: 'OrderType'}
]

const csvWriter = createObjectCsvWriter({
    path: 'orders.csv',
    header: csvHeaders
})

await csvWriter.writeRecords(res['Orders'].map(order => ({
    AmazonOrderId: order['AmazonOrderId'],
    PurchaseDate: order['PurchaseDate'],
    OrderStatus: order['OrderStatus'],
    OrderTotal: `${order['OrderTotal']['CurrencyCode']} ${order['OrderTotal']['Amount']}`,
    PaymentMethod: order['PaymentMethod'],
    MarketplaceId: order['MarketplaceId'],
    ShipmentServiceLevelCategory: order['ShipmentServiceLevelCategory'],
    OrderType: order['OrderType']
})))

console.log('The orders.csv file was created successfully')
