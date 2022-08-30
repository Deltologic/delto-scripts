# PDF Scraper
## Description
Example of reading data from a PDF file and presenting it on screen. 

The script aims to show with which tool you can extract data from a PDF file. 
Further processing, the way you work strongly depends on how structured the 
data is in your file, whether it is in the form of a table, a string of text 
or a completely different form. Each PDF should be examined separately.
## Languages
### Python
#### Dependencies
- [PyPDF2](https://pypi.org/project/PyPDF2/)
- [tabulate](https://pypi.org/project/tabulate/)

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
python pdf-scraper.py sample.pdf
```

For given sample file, below table should be visible in your terminal:
```shell
|   ID | Product   |   Unit Price |   Quantity |   Total Price | Ordered at   |
|------+-----------+--------------+------------+---------------+--------------|
|    1 | Boots     |           10 |          3 |            30 | 2022-07-30   |
|    2 | Gloves    |            3 |          1 |             3 | 2022-08-12   |
|    3 | Tea       |            1 |          5 |             5 | 2022-08-15   |

```

_Contributions are welcome_
