import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
import matter from "gray-matter";

import { createProductImages } from "../../../apiFunctions/DataFetching/createProductImages";
import { dataDbConnection } from "../../../utils/dbConnect";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let db = await dataDbConnection();

  let allImages: string[] = [];
  let missingImages = [];
  let missingProducts = [];
  let map: { [key: string]: string } = {};
  let posts = await getListofFiles("./posts");

  for (let i = 0; i < posts.length; i++) {
    let allImageInfo = await getAllImages(posts[i], map);
    let images = allImageInfo.images;
    map = allImageInfo.map;

    allImages = [...allImages, ...images];
    for (let j = 0; j < images.length; j++) {
      let image = images[j];
      let imageExists = await isImageInFolder(image);
      if (!imageExists) {
        missingImages.push(image);
        missingProducts.push(map[image]);
      }
    }
  }

  //remove duplicates from missingProducts
  //@ts-ignore
  missingProducts = [...new Set(missingProducts)];
  //remove undefined from missingProducts
  missingProducts = missingProducts.filter((item) => item !== undefined);

  //for each missing product, create the images
  for (let i = 0; i < missingProducts.length; i++) {
    let productID = missingProducts[i];
    //get product from db
    //@ts-ignore
    let productDoc = await db
      .collection("products")
      .findOne({ asin: productID });
    let product = productDoc.product;

    //convert product to json

    let productJson = await JSON.parse(product);

    await createProductImages(productJson.product);
  }

  res.status(200).json({ name: "John Doe" });
}

const getAllImages = async (
  file: string,
  map: { [key: string]: string }
): Promise<{ images: string[]; map: any }> => {
  return new Promise(async (res, rej) => {
    let post = await getContentOfBlogPost(file);
    let images = await getImageNames(post);
    let product = getProductAsin(post);

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      map[image] = product;
    }

    res({ images, map });
  });
};

const getContentOfBlogPost = async (blogPost: string): Promise<string> => {
  return new Promise((res, rej) => {
    fs.readFile(`./posts/${blogPost}`, "utf8", (err: any, data: any) => {
      if (err) {
        console.error(err);
        return;
      }
      res(data);
    });
  });
};

const getImageNames = (post: string): string[] => {
  //return an array of all image names that are found in the post
  //all images are named like this sometext.jpg

  let postArray = post.split(" ");

  let imageNames: string[] = [];

  for (let i = 0; i < postArray.length; i++) {
    let word = postArray[i];
    if (word.includes(".jpg")) {
      //strip out any extra characters
      word = word.replace("src=", "");

      //strip out any quotes
      word = word.replace('"', "");

      //strip out any single quotes
      word = word.replace("'", "");

      //remove any characters after the .jpg
      word = word.split(".jpg")[0];

      //add .jpg back to the end
      word = word + ".jpg";

      imageNames.push(word);
    }
  }

  return imageNames;
};

const getListofFiles = async (dir: string): Promise<string[]> => {
  return new Promise((res, rej) => {
    fs.readdir(dir, (err: any, files: any) => {
      if (err) {
        console.error(err);
        return;
      }
      res(files);
    });
  });
};

const isImageInFolder = async (image: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    fs.readdir("./public/postImages", (err: any, files: any) => {
      if (err) {
        console.error(err);
        return;
      }
      res(files.includes(image));
    });
  });
};

const getProductAsin = (post: string): string => {
  let postMatter = matter(post);

  return postMatter.data.productID;
};
