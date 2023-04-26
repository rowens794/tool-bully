const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createProductWhenWhy = async (
  description: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product When/Why description");

    let whenWhy = await makeOpenAIRequest(description);

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "productWhenWhy",
      generationInput: description,
      generationOutput: whenWhy,
      requires: [],
    });

    res(whenWhy);
  });
};

const makeOpenAIRequest = async (description: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
      I will provide you with a product description for a tool or set of tools and I want you to produce a paragraph describing when and why a person might need this particular tool.  Structure your output with a WHEN section and a WHY section.

      DESCRIPTION: ${description}
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
