const { Configuration, OpenAIApi } = require("openai");

export const createIntro = async (
  description: string,
  whenWhy: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product Intro");

    let generalDescription = await makeOpenAIRequest(
      description,
      whenWhy,
      productName
    );

    res(generalDescription);
  });
};

const makeOpenAIRequest = async (
  description: string,
  whenWhy: string,
  productName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
I want you to write a clever introduction to a blog post for a product review that tells a story about how you could have used the tool that's described below.  Assume that the reader doesn't know anything about the tool/product.  Make sure to use the 

Product Name: ${productName}

Product Description:${description}

${whenWhy}

INTRO:
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
