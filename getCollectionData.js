import rp from 'request-promise'

import cheerio from 'cheerio'

import getPageData from './getPageDatas.js'

import config from './config.js'

import helpers from './helpers.js'

let baseUrl = config.baseUrl


function getCollection(url) {
    return rp(url).then(html => {

        const $ = cheerio.load(html)

        const selector = "div.main-carousel > a.product-link"

        let datasLinks = []

        let elements = $(selector)

        for (let i = 0; i < elements.length; i++) {

            let linkPush

            if (elements[i].attribs.href.includes('.htm')) {
                linkPush = baseUrl + elements[i].attribs.href
            } else if (elements[i].attribs.href.includes('-')) {
                linkPush = baseUrl + elements[i].attribs.href
            } else {
                linkPush = baseUrl + elements[i].attribs.href + '.htm'
            }
            datasLinks.push(linkPush);
        }

        return Promise.all(
            datasLinks.map(function(url) {
                return getPageData(url);
            })
        );
    }).catch(err => console.log(err))
}

/*
getCollection('https://www.ticketac.com/reservation-theatre.htm').then(data => {
    console.log(helpers.insertHeaders(data))
})*/

export default getCollection