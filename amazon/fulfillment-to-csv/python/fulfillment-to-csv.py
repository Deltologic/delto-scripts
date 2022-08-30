# Delto Scripts
# Hub for open-source automation scripts.
#
# https://github.com/Deltologic/delto-scripts

from sp_api.api import Inventories
from sp_api.base import Marketplaces
import config


def script() -> None:
    CSV_HEADERS = [
        "SKU",
        "stock",
        "condition",
        "marketplace"
    ]

    with open("fulfillment.csv", "w") as csv_file:
        csv_file.write(",".join(CSV_HEADERS) + "\n")

        # for each marketplace and product get sales metric
        for marketplace in config.MARKETPLACES:
            call_api_and_append_records(marketplace, csv_file)


def call_api_and_append_records(marketplace, csv_file, next_token=None):
    # https://developer-docs.amazon.com/sp-api/docs/fbainventory-api-v1-reference
    inventories = Inventories(
        credentials=config.SP_API_CREDENTIALS, marketplace=Marketplaces[marketplace]
    ).get_inventory_summary_marketplace(
        sellerSkus=config.SELLER_SKUS,
        next_token=next_token
    )

    # append received records to CSV file
    for summary in inventories.payload["inventorySummaries"]:
        csv_file.write(f"{summary['sellerSku']},"
                       f"{summary['totalQuantity']},"
                       f"{summary['condition']},"
                       f"{marketplace}\n")

    # if response has 'nextToken', there are more products we must process
    if inventories.next_token is not None:
        call_api_and_append_records(marketplace, csv_file, inventories.next_token)


if __name__ == "__main__":
    script()
    print("The fulfillment.csv file was created successfully")
