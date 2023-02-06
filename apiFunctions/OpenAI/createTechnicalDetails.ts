const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createTechnicalDetails = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating technical details");

    let generalDescription = await makeOpenAIRequest(
      productPage,
      humanReadableName
    );

    //save the generation to the database
    let db = await dataDbConnection();
    let featureString = productPage.specifications.map((item: any) => {
      return `${item.name}: ${item.value} \n`;
    });

    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "technicalDetails",
      generationInput: JSON.stringify({
        featureString,
        humanReadableName,
      }),
      generationOutput: humanReadableName,
      requires: [],
    });

    res(generalDescription);
  });
};

const makeOpenAIRequest = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  let featureString = productPage.specifications.map((item: any) => {
    return `${item.name}: ${item.value} \n`;
  });

  return new Promise(async (res, rej) => {
    let prompt = `
      I need you to write 2 to 3 paragraphs summarizing the technical details of the ${humanReadableName}.  Include relevant items from the items listed below:

      TECHNICAL DETAILS:
      ${featureString}

      Write the text in markdown and include a header for the section with ##.  Start with a paragraph about the overall dimensions of the product, its weight, and quantity of parts (if more than one),  then include a paragraph on the product's style and build materials,  finally include a paragraph on any other details that a purchaser might find relevant when making a purchase decision.

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
