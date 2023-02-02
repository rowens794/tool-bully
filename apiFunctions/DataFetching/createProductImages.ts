const axios = require("axios");
const fs = require("fs");

export const createProductImages = async (product: any): Promise<string[]> => {
  return new Promise(async (res, rej) => {
    let successfullySavedImages: string[] = [];

    if (product && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        let filename = getImageFilename(product.images[i].link);
        let imageExists = filename ? await checkIfImageExists(filename) : null;
        if (filename && !imageExists) {
          let resFilename = await downloadImageAndSave(
            product.images[i].link,
            filename
          );

          //sleep for 1 second
          await new Promise((r) => setTimeout(r, 250));

          if (resFilename !== "") {
            successfullySavedImages.push(resFilename);
          }
        }
      }
    }

    console.log(successfullySavedImages);
    res(successfullySavedImages);
  });
};

const downloadImageAndSave = async (
  url: string,
  filename: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let encodedUrl = encodeURI(url);
    let fullUrl = `https://app.zenscrape.com/api/v1/get?apikey=${process.env.ZEN_SCRAPE_KEY}&url=${encodedUrl}`;
    axios({
      method: "GET",
      url: fullUrl,
      responseType: "stream",
    })
      .then((response: any) => {
        response.data.pipe(
          fs.createWriteStream(`./public/postImages/${filename}`)
        );
        response.data.on("end", () => {
          console.log(`${filename} downloaded and saved`);
          res(filename);
        });
      })
      .catch((err: any) => {
        console.log("error downloading image", url);
        res("");
      });
  });
};

const getImageFilename = (url: string): string | undefined => {
  //extract 61Ld+Ka31vL from https://m.media-amazon.com/images/I/61Ld+Ka31vL._AC_SL1200_.jpg
  let filename = url.split("/").pop();
  if (filename) {
    return filename.split(".").shift() + "." + filename.split(".").pop();
  }
};

const checkIfImageExists = (filename: string): boolean => {
  return fs.existsSync(`./public/postImages/${filename}`);
};
