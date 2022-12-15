import rp from 'request-promise'

import cheerio from 'cheerio'

import helpers from './helpers.js'

const getPageData = (url) => {
    return rp(url).then(html => {
        let $ = cheerio.load(html)

        let image = helpers.getImage($, 'a picture img.rounded-3')

        let title = helpers.getTitle($, 'div#product-info-box > h1.product__title')

        let rating = helpers.getRating($, 'div.product-info-rating > div.rating > div.rating__numbers > p.h5')

        let notice = helpers.getNotice($, 'div.product-info-rating > div.rating > p.text-mid-gray > a')

        let price = helpers.getPrice($, 'div.product__box > div.product__box-head > div.bg-light-gray > div.flex-md-column > p.h1 > span > span')

        let duration = helpers.parseDuration($, 'div.main-product_show > div.position-relative > div.container > div.product-detail > div.col-12 > ul.list-unstyled')

        return [url, image, title, duration, price, rating, notice]

    }).catch(err => {
        return ['Image 404 Page', 'Title 404 Page', 'Duration 404 Page', 'Price 404 Page', 'Rating 404 Page', 'Review 404 Page']
    })
}

export default getPageData