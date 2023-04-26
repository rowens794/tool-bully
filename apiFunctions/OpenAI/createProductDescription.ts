const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createProductDescription = async (
  product: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product description for: " + humanReadableName);

    let generalDescription = await makeOpenAIRequest(
      humanReadableName,
      product.description
    );

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "productDescription",
      generationInput: JSON.stringify({
        humanReadableName: humanReadableName,
        description: product.description,
      }),
      generationOutput: generalDescription,
      requires: [],
    });

    res(generalDescription);
  });
};

const makeOpenAIRequest = async (
  title: string,
  description: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
    I need you to determine a broad classification and description for the type of tool that is described by the following summary.  Do not include any brand names. 

    PRODUCT TITLE: ${title}
    PRODUCT SUMMARY: ${description}
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
