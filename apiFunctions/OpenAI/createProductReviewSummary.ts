const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createProductReviewSummary = async (
  productReviews: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product review summaries");

    let productReviewSummary = await makeOpenAIRequest(
      productReviews,
      productName
    );

    //save the generation to the database
    let db = await dataDbConnection();

    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "productReviewSummary",
      generationInput: JSON.stringify({
        productReviews,
        productName,
      }),
      generationOutput: productReviewSummary,
      requires: [],
    });

    res(productReviewSummary);
  });
};

const makeOpenAIRequest = async (
  productReviews: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
      I need you to write 3 to 5 paragraphs summarizing reviews of the ${productName}.  Include relevant quotes from the reviews listed below.

      PRODUCT REVIEWS:
      ${productReviews}

      Write the text in mark down and include a header for the section with ##.  Start the section with a paragraph about the tone of the reviews, next include a paragraph with a specific quote and others impressions that relate to that quote, finally end with a paragraph that relates my impression to the provided reviews.

      OUTPUT:
    `;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const messages = [{ role: "user", content: prompt }];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    res(completion.data.choices[0].message.content);
  });
};
