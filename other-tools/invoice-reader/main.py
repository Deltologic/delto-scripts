import sys
from pdf_invoice_parse import pdf_invoice_parse

if __name__ == '__main__':
    pdf_invoice_parse(sys.argv[1])