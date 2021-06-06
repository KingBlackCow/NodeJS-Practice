const axios = require("axios");
const cheerio = require('cheerio');

let article = [];
const crawler = (pageNumber) => {
    axios
        .get(
            `https://api.brunch.co.kr/v1/search/article?q=Hello%20world&page=${pageNumber}&pageSize=20&highlighter=y&escape=y&sortBy=accu`
        )
        .then((response) => {
            const data = response.data;
            // const $ = cheerio.load(htmlString);
            // const href = $('a').attr('href');
            // console.log(href);
            article[pageNumber] = data.data.list;
            const nextNumber = pageNumber + 1;
            console.log("current page number: ", pageNumber);
            if (nextNumber < 1) {
                crawler(nextNumber);
                return;
            }
            console.log(article);
        });
};

crawler(1);