# Delto Scripts
# Hub for open-source automation scripts.
#
# https://github.com/Deltologic/delto-scripts

import sys

from tabulate import tabulate
from PyPDF2 import PdfReader


def script(path: str) -> None:
    # initialize PdfReader
    reader = PdfReader(path)

    headers = []
    values = []

    for i, page in enumerate(reader.pages):
        # extract text from document
        text = page.extract_text().split("\n")

        # we have 6 columns, so we must iterate by 6
        for j in range(0, len(text), 6):
            if i == 0 and j == 0:
                headers = text[j:j+6]
                continue

            values.append(text[j:j+6])

    # print result in readable format
    print(tabulate(values, headers=headers, tablefmt='orgtbl'))


if __name__ == '__main__':
    script(sys.argv[1])
