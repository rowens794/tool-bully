const axios = require("axios");
const cheerio = require("cheerio");

interface Review {
  reviewID: string;
  reviewTitle: string;
  reviewText: string;
  reviewRating: string;
  reviewDate: string;
}

export const getAmazonReviews = async (asin: string): Promise<Review[]> => {
  return new Promise(async (res, rej) => {
    console.log("getting reviews for: " + asin);
    console.log("downloading reviews from page 1");
    let html1 = await getPageHtmlViaZenScrape(asin, 1);
    console.log("downloading reviews from page 2");
    let html2 = await getPageHtmlViaZenScrape(asin, 2);
    // console.log("downloading reviews from page 3");
    // let html3 = await getPageHtmlViaZenScrape(asin, 3);
    // console.log("downloading reviews from page 4");
    // let html4 = await getPageHtmlViaZenScrape(asin, 4);
    // console.log("downloading reviews from page 5");
    // let html5 = await getPageHtmlViaZenScrape(asin, 5);

    let reviews1 = getReviews(html1);
    let reviews2 = getReviews(html2);
    // let reviews3 = getReviews(html3);
    // let reviews4 = getReviews(html4);
    // let reviews5 = getReviews(html5);

    let allReviews = [
      ...reviews1,
      ...reviews2,
      // ...reviews3,
      // ...reviews4,
      // ...reviews5,
    ];

    let filteredReviews = allReviews.filter((review) => {
      return review.reviewText.length > 40;
    });

    console.log(
      "Finished getting reviews for: " +
        asin +
        " | " +
        filteredReviews.length +
        "collected"
    );

    res(filteredReviews);
  });
};

const getPageHtmlViaZenScrape = (
  asin: string,
  page: number
): Promise<string | null> => {
  return new Promise(async (res, rej) => {
    var headers = {
      apikey: process.env.ZEN_SCRAPE_KEY,
    };

    var options = {
      method: "POST",
      url: `https://app.zenscrape.com/api/v1/get?&url=https://www.amazon.com/a/product-reviews/${asin}?pageNumber=${page}`,
      headers: headers,
    };

    axios
      .request(options)
      .then(function (response: any) {
        res(response.data);
      })
      .catch(function (error: any) {
        console.log(`Failed to fetch review page ${page}`);
        res(null);
      });
  });
};

const getReviews = (html: string | null) => {
  if (html !== null) {
    const reviews: Review[] = [];
    const $ = cheerio.load(html);
    $('div[class="a-section celwidget"]').each(function (
      index: number,
      element: any
    ) {
      const reviewID = $(element).attr("id");
      const reviewTitle = $(element).find('a[data-hook="review-title"]').text();
      const reviewText = $(element)
        .find('span[data-hook="review-body"]')
        .text();
      const reviewRating = $(element)
        .find('i[data-hook="review-star-rating"]')
        .text();
      const reviewDate = $(element)
        .find('span[data-hook="review-date"]')
        .text();

      //limit the text in a review to 750 words
      const reviewTextArray = reviewText.split(" ");
      const reviewTextArrayLimited = reviewTextArray.slice(0, 150);
      const reviewTextLimited = reviewTextArrayLimited.join(" ");

      reviews.push({
        reviewID: removeWhiteSpace(reviewID),
        reviewTitle: removeWhiteSpace(reviewTitle),
        reviewText: removeWhiteSpace(reviewTextLimited),
        reviewRating: removeWhiteSpace(reviewRating),
        reviewDate: removeWhiteSpace(reviewDate),
      });
    });

    return reviews;
  } else {
    return [];
  }
};

const removeWhiteSpace = (text: string) => {
  return text.replace(/\s\s+/g, " ");
};
