const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createTitleAndExcerpt = async (
  intro: string
): Promise<{
  title: string;
  excerpt: string;
}> => {
  return new Promise(async (res, rej) => {
    console.log("creating title and excerpt");

    let titleExcerpt = await makeOpenAIRequest(intro);
    const parsedObj = createObj(titleExcerpt);

    //save the generation to the database
    let db = await dataDbConnection();

    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "titleAndExcerpt",
      generationInput: intro,
      generationOutput: titleExcerpt,
      requires: [],
    });

    res(parsedObj);
  });
};

const makeOpenAIRequest = async (intro: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
    I need you to create an engaging title and excerpt for the following blog post.  The response should be a JSON Object with the keys title and excerpt.  Here is the post: 

    POST: ${intro}

    JSON OBJECT:
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

const createObj = (
  response: string
): {
  title: string;
  excerpt: string;
} => {
  let parsedObj = JSON.parse(response);
  return parsedObj;
};
