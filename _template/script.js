// Delto Scripts
// Hub for open-source automation scripts.
// https://github.com/Deltologic/delto-scripts

import { writeFileSync } from 'fs'

const separator = ','

function script() {
    const csvContent = `Have${separator}a${separator}nice${separator}day${separator}!\n`
    writeFileSync('example.csv', csvContent)
}

script()
