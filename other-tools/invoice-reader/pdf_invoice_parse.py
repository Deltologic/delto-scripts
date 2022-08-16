from PyPDF2 import PdfReader
import re
from pprint import pprint
from typing import List

import os

import gspread
from oauth2client.service_account import ServiceAccountCredentials

GOOGLE_SHEETS_EMAIL = os.environ["GOOGLE_SHEETS_EMAIL"]
GOOGLE_SHEETS_ID = os.environ["GOOGLE_SHEETS_ID"]
GOOGLE_WORKSHEET_NAME = os.environ["GOOGLE_WORKSHEET_NAME"]


class GoogleSheets:
    def __init__(self, credentials_file: str, sheet_key: str, worksheet_name: str):
        self.credentials_file = credentials_file
        self.sheet_key = sheet_key
        self.worksheet_name = worksheet_name
        self.scope = [
            "https://spreadsheets.google.com/feeds",
        ]
        self.sheet_object = self._get_sheet_object()

    def _get_sheet_object(self) -> gspread.Worksheet:
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            self.credentials_file, self.scope
        )
        client = gspread.authorize(credentials)
        return client.open_by_key(self.sheet_key).worksheet(self.worksheet_name)

    def write_header_if_doesnt_exist(self, columns: List[str]) -> None:
        data = self.sheet_object.get_all_values()
        if not data:
            self.sheet_object.insert_row(columns)

    def append_rows(self, rows: List[List]) -> None:
        last_row_number = len(self.sheet_object.col_values(1)) + 1
        self.sheet_object.insert_rows(rows, last_row_number)


def pdf_invoice_parse(path: str) -> dict:
    reader = PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

    # first three columns in extracted text create this template (all text is in uppercase):
    # digits/letters/dots/dashes (but always word ends with letter/digit) || only numbers || sometext 
    # eg.
    # 512CUL123.3 || 12341512 || CAD SD PEO
    # CA.23ZC || 213214 || WWAZC
    # this regex is meant to find that pattern, and as analyzed two given sample invoices, 
    # only lines with products have this pattern
    lines = [line.split() for line in text.split("\n") if re.search('([0-9]|[A-Z])+\s+[0-9]+\s+[A-Z]{1,}\s', line)]

    products = []
    invoice_date = ''
    order_number = re.search('ORDER NO. \d+', text).group(0).replace('ORDER NO. ', '')

    for line in lines:
        # remove invoice date from array (last line)
        if (line[-3] == 'RUN'):
            invoice_date = line[-1]
            del line[-3:-1]

        all_info = False
        for item in line:
            if '$' in item:
                all_info = True
                break
        if not all_info:
            # there is no information about $ of item
            products.append({
                'mfg_number': line[0],
                'item_number': line[1],
                'item_description': ' '.join(line[2:-5]),
                'temp': line[-4],
                'order_qty': line[-3],
                'ship_qty': line[-2],
                'unit_price': '-',
                'idk': '-',
                'unit_promo': '-',
                'net_price': '-',
                'gross_weight': line[-1]
            })
        else:

            products.append({
                'mfg_number': line[0],
                'item_number': line[1],
                'item_description': ' '.join(line[2:-8]),
                'temp': line[-8],
                'order_qty': line[-7],
                'ship_qty': line[-6],
                'unit_price': line[-5],
                'idk': line[-4],
                'unit_promo': line[-3],
                'net_price': line[-2],
                'gross_weight': line[-1]
            })
    inv_object = {
        'order_number': order_number,
        'invoice_date': invoice_date,
        'products': products}

    return inv_object


def read_invoice_and_put_to_sheets(path: str):
    google_sheets = GoogleSheets(
        "keys.json", GOOGLE_SHEETS_ID, GOOGLE_WORKSHEET_NAME
    )
    header = [
        'mfg_number',
        'item_number',
        'item_description',
        'temp',
        'order_qty',
        'ship_qty',
        'unit_price',
        'idk',
        'unit_promo',
        'net_price',
        'gross_weight'
    ]
    google_sheets.write_header_if_doesnt_exist(header)

    products_data = pdf_invoice_parse(path)
    ready_rows = [list(row.values()) for row in products_data['products']]
    google_sheets.append_rows(ready_rows)
