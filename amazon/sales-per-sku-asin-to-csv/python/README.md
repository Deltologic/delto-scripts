# Amazon SP API - Sales metrics by ASIN/SKU and Marketplace to CSV
## Description
A simple script that takes sales metrics for given period of time from your amazon account 
and exports them to a CSV file.
## Languages
### Python
#### Dependencies
- [python-amazon-sp-api](https://sp-api-docs.saleweaver.com/)

## Connection to SP API configuration
### Credentials
You need to change the following variables (credentials) to those assigned to your SP API account
```python
REFRESH_TOKEN = '_REFRESH_TOKEN_'
LWA_APP_ID = '_LWA_APP_ID_'
CLIENT_SECRET = '_CLIENT_SECRET_'
AWS_ACCESS_KEY = '_AWS_ACCESS_KEY_'
AWS_SECRET_KEY = '_AWS_SECRET_KEY_'
ROLE_ARN = '_ROLE_ARN_'
```
[If you're having trouble getting this data, you can use the Deltologic CEO's video,
where he shows you how to properly set up your account](https://youtu.be/bHBFElmWRNg)
### Query parameters
In case you want to change marketplaces, interval time or granularity, change
the value of below variables
```python
MARKETPLACE_IDS = dict(US=Marketplaces.US, CA=Marketplaces.CA)
INTERVAL = ('2021-09-01T00:00:00-07:00', '2022-09-04T00:00:00-07:00')  # dates to be considered in report (from, to)
GRANULARITY = Granularity.TOTAL  # grouping of order metrics, based on a unit of time (total == whole interval time)
```

### Products settings
In case you want to change identifier (SKU/ASIN) and add more products to report,
edit below variables
```python
PRODUCT_IDENTIFIER = 'asin'  # "asin" or "sku"
PRODUCTS = [
    'B0B16656Z2',
    'B09STGMJVK'
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

For given marketplaces and products, `sales.csv` file will be created

_Contributions are welcome_