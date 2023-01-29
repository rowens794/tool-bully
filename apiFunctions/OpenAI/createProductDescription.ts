const { Configuration, OpenAIApi } = require("openai");

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

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res(response.data.choices[0].text);
  });
};
