# Amazon SP API - Inventory fulfillment to CSV
## Description
A simple script that takes inventory fulfillment (all or based on given SKUs) from your Amazon account
and exports them to a CSV file.
## Languages
### Python
#### Dependencies
- [python-amazon-sp-api](https://sp-api-docs.saleweaver.com/)

## Connection to SP API configuration
### Credentials
You need to change the following variables (credentials) to those assigned to your SP API account in `config.py` file
```python
SP_API_CREDENTIALS = dict(
    refresh_token="_refresh_token_",
    lwa_app_id="_lwa_app_id_",
    lwa_client_secret="_lwa_client_secret_",
    aws_access_key="_aws_access_key_",
    aws_secret_key="_aws_secret_key_",
    role_arn="_role_arn_"
)
```
[If you're having trouble getting this data, you can use the Deltologic CEO's video,
where he shows you how to properly set up your account](https://youtu.be/bHBFElmWRNg)
### Query parameters
In case you want to change marketplaces or SKUS
the value of below in `config.py`. If `SELLER_SKUS` is empty, all products from your Amazon account
will be proceeded.
```python
MARKETPLACES = ["US", "CA"]

SELLER_SKUS = [
    "NOT-EXISTING-SKU"
]
```

## Build & Run
First, create a virtual environment:
```shell
python -m venv venv
```

Start the environment:
```shell
source venv/bin/activate
```

In order to download the dependencies type:
```shell
pip install -r requirements.txt
```

Run script:
```shell
python sales-per-sku-asin-to-csv.py
```
For given marketplaces and products, `fulfillment.csv` file will be created

_Contributions are welcome_
