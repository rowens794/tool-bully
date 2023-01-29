const { Configuration, OpenAIApi } = require("openai");

export const createProductIntro = async (
  productPage: any,
  humanReadableName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product intro");

    let generalDescription = await makeOpenAIRequest(
      productPage,
      humanReadableName
    );

    res(generalDescription);
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
