import inquirer from 'inquirer';

import fs from 'fs'

import config from './config.js'

import helpers from './helpers.js'


function createOutputDirectory() {

    try {
        if (!fs.existsSync('../../' + config.outputDir)) {
            fs.mkdirSync('../../' + config.outputDir);
        }
    } catch (err) {
        console.error(err);
    }
}


function getAnswers() {

    const filesInsideOutputDir = helpers.getFilesInsideOutputDir()

    const questions = [

        {
            type: 'list',
            name: 'category',
            message: 'What category do you choose?',
            choices: [{
                    key: 'rsTh',
                    name: 'Theater',
                    value: 'reservation-theatre',
                },
                {
                    key: 'rsHm',
                    name: 'Humor',
                    value: 'reservation-humour',
                },
                {
                    key: 'rsMuDa',
                    name: 'Music & dance',
                    value: 'reservation-musique-danse',
                },
                {
                    key: 'rsSpEn',
                    name: 'Shows for children',
                    value: 'reservation-spectacles-pour-enfants',
                },
                {
                    key: 'rsSpCa',
                    name: 'Big cabaret show',
                    value: 'reservation-grand-spectacle-show-cabaret',
                },
                {
                    key: 'rsMuEx',
                    name: 'Museum exhibition',
                    value: 'reservation-musee-exposition-visite-guidee',
                },
                {
                    key: 'rsLoSp',
                    name: 'Sports & leisures',
                    value: 'reservation-loisir-sport',
                },
            ],
        }, {
            type: 'confirm',
            name: 'outfutFile',
            message: 'Output file ?',
            default: false,
        }, {
            type: 'input',
            name: 'fileName',
            message: 'Enter a valid csv file name',
            when: (answers) => answers.outfutFile === true,
            validate: function(input) {
                const pass = input.match(
                    /^\w+.(csv)$/igm
                );
                if (pass) {

                    if (!filesInsideOutputDir.includes(input)) {
                        return true;
                    } else {
                        return 'Please enter another file : ' + input + ' is already created'
                    }
                }

                return 'Please enter a csv file name';
            }
        }
    ]

    return inquirer.prompt(questions).then((answers) => {
        return answers
    })
}

export default { getAnswers, createOutputDirectory }