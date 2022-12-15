#! /usr/bin/env node

import startup from './startup.js'

import configuration from './config.js'

import getCollection from './getCollectionData.js';

import helpers from './helpers.js';

import createCsv from './storage.js';

import printTable from './table.js';

import chalk from 'chalk';

import ora from 'ora';

let date = Date.now()

console.log('')
console.log(chalk.black.bgCyan.bold(`o--------------------------------------------------------------o`));
console.log(chalk.black.bgCyan.bold(`|            FDL SCRAPPER RUNNING CHOOSE A CATEGORY            |`));
console.log(chalk.black.bgCyan.bold(`o--------------------------------------------------------------o`));
console.log('')


startup.createOutputDirectory()

startup.getAnswers().then((answers) => {

    try {

        console.log('')

        console.log(chalk.bold.white('Category :'), chalk.green(answers.category))

        if (answers.outfutFile) {
            console.log(chalk.white.bold('Output :'), chalk.green(answers.fileName))
        }
        console.log('')

        const spinner = ora({
            text: "Analize informations for scraping",
            color: "blue",
            hideCursor: false,
        }).start();

        let url = helpers.getUrlCategory(answers.category)

        spinner.text = "Scraping page"

        getCollection(url).then(datas => {

            spinner.succeed(`Page scraping is successfull after ${Date.now() - date}ms`);

            spinner.clear();

            if (answers.outfutFile) {
                createCsv(answers.fileName, datas)
            }

            printTable(datas)

            console.log(chalk.green.bold('Thanks for using this tool :)'))
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
})