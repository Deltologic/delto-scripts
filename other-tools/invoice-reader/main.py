import sys
from pdf_invoice_parse import read_invoice_and_put_to_sheets

if __name__ == '__main__':
    read_invoice_and_put_to_sheets(sys.argv[1])