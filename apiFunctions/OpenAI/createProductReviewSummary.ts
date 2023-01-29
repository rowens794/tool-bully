const { Configuration, OpenAIApi } = require("openai");

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
