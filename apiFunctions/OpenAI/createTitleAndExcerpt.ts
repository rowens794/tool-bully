const { Configuration, OpenAIApi } = require("openai");

export const createTitleAndExcerpt = async (
  intro: string
): Promise<{
  title: string;
  excerpt: string;
}> => {
  return new Promise(async (res, rej) => {
    console.log("creating title and excerpt");

    let generalDescription = await makeOpenAIRequest(intro);
    const parsedObj = createObj(generalDescription);

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

const createObj = (
  response: string
): {
  title: string;
  excerpt: string;
} => {
  let parsedObj = JSON.parse(response);
  return parsedObj;
};
