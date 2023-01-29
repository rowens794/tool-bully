const axios = require("axios");
const cheerio = require("cheerio");

export interface PageContent {
  title: string;
  price: string;
  listPrice: string;
  description: string;
  features: string[];
  technicalDetails: string[];
  productImages: string[];
}

export const getAmazonProductPage = async (
  asin: string
): Promise<PageContent | null> => {
  return new Promise(async (res, rej) => {
    console.log("getting Product Page for: " + asin);
    let html = await getProductPageHTML(asin);

    // add 2 additional requests if page fails to load
    if (!html) {
      //sleep for 1 second
      await new Promise((r) => setTimeout(r, 1000));
      html = await getProductPageHTML(asin);
    }
    if (!html) {
      //sleep for 1 second
      await new Promise((r) => setTimeout(r, 1000));
      html = await getProductPageHTML(asin);
    }

    let productPage = parsePage(html);

    console.log("Finished getting Product Page for: " + asin);

    res(productPage);
  });
};

const getProductPageHTML = (asin: string): Promise<string | null> => {
  return new Promise(async (res, rej) => {
    var headers = {
      apikey: "6655e550-6ac4-11ed-b4d7-c1a6763e5675",
    };

    var options = {
      method: "POST",
      url: `https://app.zenscrape.com/api/v1/get?&url=https://www.amazon.com/a/dp/${asin}premium=true`,
      headers: headers,
    };

    axios
      .request(options)
      .then(function (response: any) {
        res(response.data);
      })
      .catch(function (error: any) {
        console.log(`Failed to fetch product page`);
        res(null);
      });
  });
};

const parsePage = (html: string | null): PageContent | null => {
  if (html !== null) {
    const $ = cheerio.load(html);

    //get product description
    let description = removeWhiteSpace($("#productDescription").text());
    let productTitle = removeWhiteSpace($("#productTitle").text());

    //get the text of the element with the class a-section a-spacing-none aok-align-center
    let price = $(
      "span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay"
    )
      .find("span:first-child.a-offscreen")
      .text();
    let listPrice = $("span.a-price.a-text-price")
      .find("span:first-child.a-offscreen")
      .text();

    //create an array of features
    let productFeatures: string[] = [];
    $("#feature-bullets")
      .find("li")
      .each((i: number, el: any) => {
        productFeatures.push(removeWhiteSpace($(el).text()));
      });

    //get a list of the product image links
    let productImages: string[] = [];
    $("#altImages")
      .find("img")
      .each((i: number, el: any) => {
        productImages.push($(el).attr("src"));
      });
    productImages = cleanProductImages(productImages);

    //get technical details
    let productDetails: string[] = [];
    $("#productDetails_techSpec_section_1")
      .find("tr")
      .each((i: number, el: any) => {
        //combine the header and value into one string
        productDetails.push(
          removeWhiteSpace(
            $(el).find("th").text() + ": " + $(el).find("td").text()
          )
        );
      });

    let pageDetails = {
      title: productTitle,
      price: price,
      listPrice: listPrice,
      description: description,
      features: productFeatures,
      technicalDetails: productDetails,
      productImages: productImages,
    };

    return pageDetails;
  } else {
    return null;
  }
};

const removeWhiteSpace = (text: string) => {
  return text.replace(/\s\s+/g, " ");
};

const cleanProductImages = (images: string[]) => {
  let newImages: string[] = [];
  images.forEach((image) => {
    if (image.includes("._AC_US40_")) {
      newImages.push(image.replace("._AC_US40_", ""));
    }
  });

  return newImages;
};
