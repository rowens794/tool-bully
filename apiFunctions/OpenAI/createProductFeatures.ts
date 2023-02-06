const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createProductFeatures = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product features");

    let productFeatures = await makeOpenAIRequest(
      productPage,
      humanReadableName
    );

    //save the generation to the database
    let db = await dataDbConnection();
    let featureString = productPage.feature_bullets.join("\n\n");

    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "productFeatures",
      generationInput: JSON.stringify({
        features: featureString,
        humanReadableName,
      }),
      generationOutput: productFeatures,
      requires: [],
    });

    res(productFeatures);
  });
};

const makeOpenAIRequest = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let featureString = productPage.feature_bullets.join("\n\n");

    let prompt = `
      I need you to write 3 paragraphs about the product features of the ${humanReadableName}.  Here are the features

      PRODUCT FEATURES:
      ${featureString}

      Write the text in markdown and include a header for the section with ##.

      OUTPUT:
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res(response.data.choices[0].text);
  });
};
