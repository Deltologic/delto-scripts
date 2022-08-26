import { readFileSync, createReadStream } from "fs"
import { GoogleSpreadsheet } from "google-spreadsheet"
import csvParser from "csv-parser";

// configuration parameters
const SPREADSHEET_ID = '_SPREADSHEET_ID'
const SHEET_NAME = 'Arkusz1'
const CSV_FILE = 'sample_data.csv'

const script = () => {
    const rows = []

    // read csv file content
    createReadStream(CSV_FILE, 'utf8')
        .pipe(csvParser())
        .on('data', (row) => {
            rows.push(Object.values(row))
        })
        .on('end', async () => {
            await appendDataToSpreadsheet(rows)
        })
}

const appendDataToSpreadsheet = async (rows) => {
    // read file with required credentials obtained in Google Cloud Platform
    const credentials = JSON.parse(readFileSync('credentials.json', 'utf8'))

    // create document object to work with spreadsheet
    const document = new GoogleSpreadsheet(SPREADSHEET_ID)

    // authorize account
    await document.useServiceAccountAuth({
        client_email: credentials['client_email'],
        private_key: credentials['private_key'].replace(/\\n/gm, '\n')
    })

    // required if we want to work with sheets
    await document.loadInfo()

    // select specific sheet by title
    const sheet = document.sheetsByTitle[SHEET_NAME]

    // append rows with data to sheet
    await sheet.addRows(rows, { raw: true })
}

script()
