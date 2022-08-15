// Delto Scripts
// Hub for open-source automation scripts.
// https://github.com/Deltologic/delto-scripts

import { writeFileSync } from 'fs'

// define CSV columns separator
const separator = ','

function script() {
    // prepare CSV file structure
    const csvContent = `Have${separator}a${separator}nice${separator}day${separator}!\n`
    // save the CSV file
    writeFileSync('example.csv', csvContent)
}

// start the script
script()
