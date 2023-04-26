const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createProductIntro = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product intro");

    let productIntro = await makeOpenAIRequest(productPage, humanReadableName);

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "productIntro",
      generationInput: JSON.stringify({
        description: productPage.description,
        humanReadableName,
      }),
      generationOutput: productIntro,
      requires: [],
    });

    res(productIntro);
  });
};

const makeOpenAIRequest = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
      I need you to write 3 paragraphs introducing the ${humanReadableName}.  Here is a description of the product

      PRODUCT DESCRIPTION:
      ${productPage.description}

      I need you to write the introduction in the first person as a handy male whose not afraid to tackle a big project.  The first paragraph should be what the product does, the second paragraph should be why it does it well, and the third is why I love it.

      Write the text in mark down and include a header for the section with ##.

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
