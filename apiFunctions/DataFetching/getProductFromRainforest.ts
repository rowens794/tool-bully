const axios = require("axios");

import { dataDbConnection } from "../../utils/dbConnect";

export interface PageContent {
  title: string;
  price: string;
  listPrice: string;
  description: string;
  features: string[];
  technicalDetails: string[];
  attributes: string[];
  productImages: string[];
  productRating: string;
  ratingBreakdown: string[];
  topReviews: string[];
}

export const getRainforestProductPage = async (asin: string): Promise<any> => {
  return new Promise(async (res, rej) => {
    //@ts-ignore
    let product = await getProductFromDB(asin);
    if (!product) {
      product = await fetchProductFromRainforest(asin);
      if (product) await saveProductToDB(product, asin);
    }

    res(product.product);
  });
};

const getProductFromDB = (asin: string): Promise<any | null> => {
  return new Promise(async (res, rej) => {
    let db = await dataDbConnection();
    //@ts-ignore
    db.collection("products").findOne(
      { asin: asin },
      (err: any, result: any) => {
        if (err || !result) {
          console.log(err);
          res(null);
        } else {
          let json = JSON.parse(result.product);
          res(json);
        }
      }
    );
  });
};

const fetchProductFromRainforest = async (
  asin: string
): Promise<string | null> => {
  return new Promise((res, rej) => {
    const params = {
      api_key: process.env.RAINFOREST_API_KEY,
      amazon_domain: "amazon.com",
      asin: asin,
      type: "product",
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

const saveProductToDB = (
  product: any,
  asin: string
): Promise<string | null> => {
  return new Promise(async (res, rej) => {
    let db = await dataDbConnection();

    let productString = JSON.stringify(product);

    //@ts-ignore
    db.collection("products").insertOne(
      { asin, product: productString },
      (err: any, result: any) => {
        if (err) {
          res(null);
        } else {
          res(result);
        }
      }
    );
  });
};
