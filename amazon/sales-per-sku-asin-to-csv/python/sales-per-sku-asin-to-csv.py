# Delto Scripts
# Hub for open-source automation scripts.
# https://github.com/Deltologic/delto-scripts

from sp_api.api import Sales
from sp_api.base import Marketplaces
from sp_api.base.sales_enum import Granularity


def script() -> None:
    # Amazon required credentials to connect with SP-API
    REFRESH_TOKEN = '_REFRESH_TOKEN_'
    LWA_APP_ID = '_LWA_APP_ID_'
    CLIENT_SECRET = '_CLIENT_SECRET_'
    AWS_ACCESS_KEY = '_AWS_ACCESS_KEY_'
    AWS_SECRET_KEY = '_AWS_SECRET_KEY_'
    ROLE_ARN = '_ROLE_ARN_'

    # Required parameters to make API call in the script
    MARKETPLACE_IDS = dict(US=Marketplaces.US, CA=Marketplaces.CA)
    INTERVAL = ('2021-09-01T00:00:00-07:00', '2022-09-04T00:00:00-07:00')  # dates to be considered in report (from, to)
    GRANULARITY = Granularity.TOTAL  # grouping of order metrics, based on a unit of time (total == whole interval time)

    # Products settings
    PRODUCT_IDENTIFIER = 'asin'  # "asin" or "sku"
    PRODUCTS = [
        'B0B16656Z2',
        'B09STGMJVK'
    ]

    CSV_HEADERS = [
        PRODUCT_IDENTIFIER,
        'sales',
        'amount',
        'currency',
        'marketplace'
    ]

    # Credentials dictionary required to make request to SP API
    CREDENTIALS = dict(
        refresh_token=REFRESH_TOKEN,
        lwa_app_id=LWA_APP_ID,
        lwa_client_secret=CLIENT_SECRET,
        aws_secret_key=AWS_SECRET_KEY,
        aws_access_key=AWS_ACCESS_KEY,
        role_arn=ROLE_ARN,
    )

    with open('sales.csv', 'w') as csv_file:
        csv_file.write(','.join(CSV_HEADERS) + "\n")

        # for each marketplace and product get sales metric
        for country, marketplaceId in MARKETPLACE_IDS.items():
            for product in PRODUCTS:
                # call SP API for metrics https://developer-docs.amazon.com/sp-api/docs/sales-api-v1-reference
                sales = Sales(credentials=CREDENTIALS, marketplace=marketplaceId)
                res = sales.get_order_metrics(
                    interval=INTERVAL,
                    granularity=GRANULARITY,
                    asin=product
                ) if PRODUCT_IDENTIFIER == 'asin' else \
                    sales.get_order_metrics(
                        interval=INTERVAL,
                        granularity=GRANULARITY,
                        sku=product
                    )
                metric = res.payload[0]

                # write received record to csv file
                csv_file.write(f"{product},"
                               f"{metric['unitCount']},"
                               f"{metric['totalSales']['amount']},"
                               f"{metric['totalSales']['currencyCode']},"
                               f"{country}\n")

    print('The sales.csv file was created successfully')


if __name__ == '__main__':
    script()
