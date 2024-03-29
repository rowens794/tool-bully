const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createQandA = async (
  reviewIdeas: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product Q&A");

    let qanda = await makeOpenAIRequest(reviewIdeas, productName);

    let splitQandA = qanda.split("||||");

    let qAndAObject = [];

    for (let i = 0; i < splitQandA.length; i++) {
      if (i % 2 === 0) {
        qAndAObject.push({
          Q: removeNewLinesAndSpaces(splitQandA[i]),
          A: removeNewLinesAndSpaces(splitQandA[i + 1]),
        });
      }
    }

    let formattedResponse = makeOpenAIFormatRequest(splitQandA.join(""));

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "qAndA",
      generationInput: JSON.stringify({ reviewIdeas, productName }),
      generationOutput: formattedResponse,
      requires: [],
    });

    res(formattedResponse);
  });
};

const makeOpenAIRequest = async (
  reviewIdeas: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
        Based on the product reviews I've collected for a product called ${productName}, what are the top 8 questions would you expect prospective customers to ask about the product and what would the answers be?  Create a list where each item is separated by "||||" per the following example structure:
        
        Q: [the question being asked] ||||
        A: [the answer to the questions] ||||
        Q: [the question being asked] ||||
        A: [the answer to the questions] ||||

        Product Reviews:
        ${reviewIdeas}

        QUESTIONS:
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

const makeOpenAIFormatRequest = async (splitQandA: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
      I need you to write a q and a section for a blog post. The Q's and A's are listed below:

      Questions and Answers:
      ${splitQandA}

      Write the text in mark down and include a header for the section with ##.  Bold all questions.  Do write any text that is not either a question or an answer.
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

const removeNewLinesAndSpaces = (text: string): string => {
  let newText = "";

  if (text) {
    //replace all new lines with spaces
    newText = text.replace(/(\r\n|\n|\r)/gm, "");

    //replace leading spaces with nothing
    newText = newText.replace(/^\s+/gm, "");

    //replace trailing spaces with nothing
    newText = newText.replace(/\s+$/gm, "");

    //replace leading "Q: " with nothing
    newText = newText.replace(/^Q: /gm, "");

    //replace leading "A: " with nothing
    newText = newText.replace(/^A: /gm, "");
  }

  return newText;
};
