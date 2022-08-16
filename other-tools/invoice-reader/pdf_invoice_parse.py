from PyPDF2 import PdfReader
import re
from pprint import pprint

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
    
    pprint( {
        'order_number': order_number,
        'invoice_date': invoice_date,
        'products': products}
    )
