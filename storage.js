import fs from "fs"

import { stringify } from "csv-stringify"

import config from './config.js'

import helpers from './helpers.js'

function createCsv(fileName, datas) {
    try {

        let filename = helpers.getCsvFilePath(fileName)

        const writableStream = fs.createWriteStream(filename);

        const stringifier = stringify({ header: true, columns: config.csvHeaders });

        datas.forEach(element => {
            stringifier.write(element);
        });

        stringifier.pipe(writableStream);

        return filename

    } catch (error) {
        process.exit(1)
    }
}

export default createCsv