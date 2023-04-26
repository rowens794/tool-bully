const { Configuration, OpenAIApi } = require("openai");

export const createPostSummary = async (post: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating product Intro");

    let generalDescription = await makeOpenAIRequest(post);

    res(generalDescription);
  });
};

const makeOpenAIRequest = async (post: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
      I need to write a summary paragraph for the following blog post.  I need to summarize the major points throughout the post and express my opinion on the product being reviewed.

      HERE IS THE POST (in markdown format):
      ${post}

      The output should include two paragraphs: one summarizing the major points of each section of the post and a second expressing my opinion on the product and encouraging readers to check the product out on amazon. The section should include a header with ##.  The output should be in markdown format.

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
