import axios from "axios";
import { dataDbConnection } from "../../utils/dbConnect";

interface Review {
  reviewID: string;
  reviewTitle: string;
  reviewText: string;
  reviewRating: string;
  reviewDate: string;
}

export const getAmazonReviewsFromRainforest = async (
  asin: string
): Promise<Review[]> => {
  return new Promise(async (res, rej) => {
    //@ts-ignore
    let reviews = await getReviewsFromDB(asin);
    if (!reviews) {
      reviews = await fetchReviewsFromRainforest(asin, 3);
      if (reviews) await saveReviewsToDB(reviews, asin);
    }

    res(reviews);
  });
};

const getReviewsFromDB = (asin: string): Promise<any | null> => {
  return new Promise(async (res, rej) => {
    let db = await dataDbConnection();
    //@ts-ignore
    db.collection("reviews").findOne(
      { asin: asin },
      (err: any, result: any) => {
        if (err || !result) {
          res(null);
        } else {
          let json = JSON.parse(result.reviews);
          res(json);
        }
      }
    );
  });
};

const fetchReviewsFromRainforest = async (
  asin: string,
  pagesToFetch: number
): Promise<string | null> => {
  return new Promise((res, rej) => {
    let promises = [];
    for (let i = 1; i <= pagesToFetch; i++) {
      promises.push(fetchReviewPageFromRainforest(asin, i));
    }

    Promise.all(promises).then((values) => {
      let reviews: any = [];
      values.forEach((page: any) => {
        reviews = reviews.concat(page.reviews);
      });
      console.log("reviews fetched from Rainforest");
      res(reviews);
    });
  });
};

const fetchReviewPageFromRainforest = async (
  asin: string,
  page: number
): Promise<string | null> => {
  return new Promise((res, rej) => {
    const params = {
      api_key: process.env.RAINFOREST_API_KEY,
      amazon_domain: "amazon.com",
      asin: asin,
      type: "reviews",
      page: page,
    };

    // make the http GET request to Rainforest API
    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response: any) => {
        // print the JSON response from Rainforest API
        res(response.data);
      })
      .catch((error: any) => {
        // catch and print the error
        rej(error);
      });
  });
};

const saveReviewsToDB = (
  reviews: any,
  asin: string
): Promise<string | null> => {
  return new Promise(async (res, rej) => {
    let db = await dataDbConnection();

    let reviewsString = JSON.stringify(reviews);

    //@ts-ignore
    db.collection("reviews").insertOne(
      { asin, reviews: reviewsString },
      (err: any, result: any) => {
        if (err) {
          res(null);
        } else {
          console.log("saved to db reviews");
          res(result);
        }
      }
    );
  });
};
