# FDL WEB SCRAPPER
In this node project I show you how I made a CLI tool that scrap datas from a movies website (https://www.ticketac.com) , store them in a CSV file & print it to cli.
Command line : npx scrap-movies

## NPX SCRAP-MOVIES
I use the package named 'inquirer' to have interactions with user in CLI.I get the category choosen by user & the name of the output file .With the category I scrap data wanted by user.After that datas are printed in a table at cli and store in csv file

## Configuration file : config.js

config.js export a json object which contains some reusable datas of the app and other config data


    "baseUrl": "https://www.ticketac.com",

    "outputDir": "scraped-movies-output-directory",

    "categories": [
        'reservation-theatre',
        'reservation-humour',
        'reservation-musique-danse',
        'reservation-spectacles-pour-enfants',
        'reservation-grand-spectacle-show-cabaret',
        'reservation-musee-exposition-visite-guidee',
        'reservation-loisir-sport'
    ],

    "csvHeaders": [
        "RessourceUrl",
        "Image",
        "Title",
        "Duration",
        "Price",
        "Rating",
        "Reviews"
    ],

## Scrapping datas
getPageData.js take the link of a movie and scrap data by returning an array like this : [url, image, title, duration, price, rating, notice]
getCollectionData.js take all link of a category and pass them to getPageData.js in order to scrap all data of a given category


### Storing datas 
I store datas in a csv file .I use for that the fs module & csv-stringify

## Somes helpers
They are located at ./helpers.js






