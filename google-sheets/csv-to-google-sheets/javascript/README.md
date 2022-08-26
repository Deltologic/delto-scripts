# Read CSV file and append its content to Google Sheets
## Description
A script that reads data from a CSV file and adds it to a designated Google sheet.

## Languages
### Javascript (Node.js)
#### Dependencies
- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)
- [csv-parser](https://www.npmjs.com/package/csv-parser)

## Configuration
### Google Cloud Platform
In order to use the Google Sheets programmatically, you need to create an account on 
Google Cloud Platform and set up an account to communicate with the API. For this,
Google account is required.

1. Go to [Google Cloud Platform Console](https://console.cloud.google.com/) and login to your account
2. In search bar (top middle on the screen) find _Create a project_ and click first option.
3. Fill in the form with project name and click `CREATE`.
4. Choose created project from top left dropdown (right to _Google Cloud_ logo).
5. In search bar type _Google Sheets API_ and click on corresponding option.
6. Click `ENABLE` button. You will be redirected to API settings.
7. Click `CREDENTIALS` on the side menu.
8. Click `CREATE CREDENTIALS` button (below search bar) and select `Service account`.
9. Fill in required data and click `CREATE AND CONTINUE`.
10. From dropdown, select `Owner` role and click `CONTINUE`.
11. Click `DONE`.
12. In `Service Accounts` section new account will be visible. Copy and save somewhere email
value as it will be required later for specific sheet configuration.
13. Click on email value, you will be redirected to account settings.
14. Click on `KEYS` tab, then click `ADD KEY` button and select `Create new key`.
15. For key type select `JSON` and click `CREATE`. File with credentials will be automatically downloaded.
16. Rename downloaded file to `credentials.json` and paste it to directory where script is located.

### Google Sheets
1. Go to [Google Spreadsheets](https://docs.google.com/spreadsheets/) main page.
2. Create new Spreadsheet.
3. Fill sheet's first row with desired header values (or just type random thing in A1 cell)
as script requires not blank first row of sheet.
4. Click `Share` button in top right corner.
5. Paste in email obtained in step 12 of GCP configuration. For permission, choose `Editor` and save.
6. Now everything should be set up correctly.

### Code
Replace this variables with proper values:
```javascript
// configuration parameters
const SPREADSHEET_ID = '16PP31WNCtirU7ePoR3mdhZgauL4PqcyDjlqmffTDjv8'
const SHEET_NAME = 'Arkusz1'
const CSV_FILE = 'sample_data.csv'
```

`SPREADSHEET_ID` can be found in link, e.g.
https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit#gid=0

## Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run script, type
```shell
node csv-to-google-sheets.js
```

_Contributions are welcome_
