import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
const { ESLint } = require("eslint");

import { getRainforestProductPage } from "../../../apiFunctions/DataFetching/getProductFromRainforest";
import { getAmazonReviewsFromRainforest } from "../../../apiFunctions/DataFetching/getReviewsFromRainforest";
import { createProductDescription } from "../../../apiFunctions/OpenAI/createProductDescription";
import { createProductWhenWhy } from "../../../apiFunctions/OpenAI/createProductWhenWhy";
import { createIntro } from "../../../apiFunctions/OpenAI/createIntro";
import { createReviewSummaries } from "../../../apiFunctions/OpenAI/createReviewSummaries";
import { createQandA } from "../../../apiFunctions/OpenAI/createQandA";
import { createProductIntro } from "../../../apiFunctions/OpenAI/createProductIntro";
import { createProductFeatures } from "../../../apiFunctions/OpenAI/createProductFeatures";
import { createProductReviewSummary } from "../../../apiFunctions/OpenAI/createProductReviewSummary";
import { createTechnicalDetails } from "../../../apiFunctions/OpenAI/createTechnicalDetails";
import { createPostSummary } from "../../../apiFunctions/OpenAI/createPostSummary";
import { createProductImages } from "../../../apiFunctions/DataFetching/createProductImages";
import { createTitleAndExcerpt } from "../../../apiFunctions/OpenAI/createTitleAndExcerpt";
import { createHumanReadableName } from "../../../apiFunctions/OpenAI/createHumanReadableName";
import { dataDbConnection } from "../../../utils/dbConnect";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit");
  //get the product ID from the request
  let { productID } = req.query;
  productID = productID ? productID.toString() : "";
  let affiliateLink = `https://www.amazon.com/dp/${productID}?tag=${process.env.AMAZON_TRACKING_ID}`;

  let productPage = await getRainforestProductPage(productID);
  let reviews = await getAmazonReviewsFromRainforest(productID);

  let productImages = await createProductImages(productPage);

  if (productPage) {
    let humanReadableName = await createHumanReadableName(productPage.title);
    let generalDesc = await createProductDescription(
      productPage,
      humanReadableName
    );

    let productWhenWhy = await createProductWhenWhy(generalDesc);
    let intro = await createIntro(
      generalDesc,
      productWhenWhy,
      humanReadableName
    );

    let reviewSummaries = await createReviewSummaries(reviews);
    let qAndA = await createQandA(reviewSummaries, humanReadableName);

    let productIntroduction = await createProductIntro(
      productPage,
      humanReadableName
    );

    let productFeatures = await createProductFeatures(
      productPage,
      humanReadableName
    );

    let productReviewSummary = await createProductReviewSummary(
      reviewSummaries,
      humanReadableName
    );

    let technicalDetails = await createTechnicalDetails(
      productPage,
      humanReadableName
    );

    let titleExcerpt = await createTitleAndExcerpt(productIntroduction);

    //write the blog post to file
    await writePostToFile(
      {
        title: titleExcerpt.title,
        excerpt: titleExcerpt.excerpt,
        hook: intro,
        intro: productIntroduction,
        productFeatures: productFeatures,
        productReviewSummary: productReviewSummary,
        technicalDetails: technicalDetails,
        qAndA: qAndA,
        productImages: productImages,
        affiliateLink: affiliateLink,
      },
      productID
    );

    //lint the file
    const eslint = new ESLint({
      fix: true,
      useEslintrc: false,
      overrideConfig: {
        extends: ["next", "next/core-web-vitals"],
        rules: {
          "react/react-in-jsx-scope": "off",
        },
      },
    });

    const results = await eslint.lintFiles([
      `./posts/${createSlug(titleExcerpt.title)}.mdx`,
    ]);

    await ESLint.outputFixes(results);

    console.log("Post written to file");
  }

  res.status(200).json({ name: "John Doe" });
}

export interface Post {
  title: string;
  excerpt: string;
  hook: string;
  intro: string;
  productFeatures: string;
  productReviewSummary: string;
  technicalDetails: string;
  qAndA: string;
  productImages: string[];
  affiliateLink: string;
}

export interface PostMeta {
  title: string;
  productID: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  name: string;
  authorImage: string;
  affiliateLink: string;
  heroImages: string;
}

const writePostToFile = (post: Post, productID: string) => {
  let slug = createSlug(post.title);

  let matter = `
---
title: ${post.title}
productID: ${productID}
excerpt: ${post.excerpt}
slug: ${slug}
date: ${new Date().toISOString()}
author: Doug
name: Doug
authorImage: /avatar.jpeg
affiliateLink: ${post.affiliateLink}
heroImages: ${post.productImages[0] ? post.productImages[0] : ""} | ${
    post.productImages[1] ? post.productImages[1] : ""
  }
---
    `;

  let postContent = matter;
  let postSections = [
    post.hook,
    post.intro,
    post.productFeatures,
    post.productReviewSummary,
    post.technicalDetails,
    post.qAndA,
  ];

  postSections.forEach((section, i) => {
    let image = post.productImages[i] ? post.productImages[i] : null;
    if (image) {
      if (i % 2 === 0) {
        postContent =
          postContent +
          "\n\n" +
          section +
          `<Image src='${post.productImages[i]}' alt='${removeApostrophes(
            post.title
          )}' width='600' height='600' />`;
      } else {
        postContent =
          postContent +
          "\n\n" +
          section +
          `<BuyButton affiliateLink='${post.affiliateLink}' />`;
        +`<Image src='${post.productImages[i]}' alt='${removeApostrophes(
          post.title
        )}' width='600' height='600' />`;
      }
    } else {
      postContent = postContent + "\n\n" + section;
    }
  });

  return new Promise(async (res, rej) => {
    let summary = await createPostSummary(postContent);
    postContent = postContent + "\n\n" + summary;

    await fs.writeFile(`./posts/${slug}.mdx`, postContent, () => {
      console.log(productID + " written to file");
      res(null);
    });
  });
};

const createSlug = (title: string) => {
  //remove all non-alphanumeric characters
  let slug = title.replace(/[^a-zA-Z0-9 ]/g, "");
  //replace all spaces with dashes
  slug = slug.replace(/ /g, "-");
  //replace all double dashes with single dashes
  slug = slug.replace(/--/g, "-");
  //make lowercase
  slug = slug.toLowerCase();
  return slug;
};

const removeApostrophes = (text: string) => {
  return text.replace(/'/g, "");
};

const removeColons = (text: string) => {
  return text.replace(/:/g, "");
};
