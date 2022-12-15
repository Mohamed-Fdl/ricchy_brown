import path from 'path';

import fs from 'fs'

import config from './config.js'

import { fileURLToPath } from 'url'

import { dirname } from 'path'


function getDirName() {
    const __filename = fileURLToPath(
        import.meta.url)


    return dirname(__filename)
}

function getFilesInsideOutputDir() {

    const directoryPath = path.join(getDirName(), './' + config.outputDir);

    return fs.readdirSync(directoryPath, function(err, files) {

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        return files
    });
}

function parseDuration(pageLoaded, selector) {
    try {
        let getDuration = pageLoaded(selector).text().split(' ').join('')

        let parseDuration = getDuration.trim().split('\n').filter(e => {
            if (e.includes('heure')) return e
        })[0].replace('heure', 'h').replace('minute', 'min')

        if (parseDuration.includes('hs')) {
            parseDuration = parseDuration.replace('hs', 'h ')
        } else {
            parseDuration = parseDuration.replace('h', 'h ')
        }

        return parseDuration
    } catch (error) {
        return 'Duration not found'
    }
}

function getImage(pageLoaded, selector) {
    try {
        return pageLoaded(selector)[0].attribs.src
    } catch (error) {
        return 'Image not found'
    }
}

function getTitle(pageLoaded, selector) {
    try {
        return pageLoaded(selector).text().replace('\n', '').trim()
    } catch (error) {
        return 'Title not found'
    }
}

function getRating(pageLoaded, selector) {
    try {
        return parseFloat(pageLoaded(selector).text().replace('\n', '').trim())
    } catch (error) {
        return 'Rating not found'
    }
}

function getNotice(pageLoaded, selector) {
    try {
        return parseInt(pageLoaded(selector).text().split(' ').join('').replace('avis', ''))
    } catch (error) {
        return 'Notice not found'
    }
}

function getPrice(pageLoaded, selector) {
    try {
        return pageLoaded(selector).text().replace('\n', '').trim()
    } catch (error) {
        return 'Price not found'
    }
}

function getUrlCategory(category) {

    let baseUrl = config.baseUrl

    return `${baseUrl}/${category}.htm`
}

function getCsvFilePath(name) {
    return `${getDirName()}/${config.outputDir}/${name}`
}


function insertHeaders(arr) {
    return [].concat([config.csvHeaders], arr);
}


export default { getUrlCategory, getDirName, getFilesInsideOutputDir, getImage, getTitle, getRating, getNotice, getPrice, parseDuration, insertHeaders, getCsvFilePath }