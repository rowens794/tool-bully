const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createReviewSummaries = async (reviews: any): Promise<string> => {
  return new Promise(async (res, rej) => {
    const reviewsString = formatReviews(reviews);
    let reviewSummaries = await makeOpenAIRequest(reviewsString);

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "reviewSummaries",
      generationInput: reviewsString,
      generationOutput: reviewSummaries,
      requires: [],
    });

    res(reviewSummaries);
  });
};

const makeOpenAIRequest = async (reviewIdeas: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
        I need you to extract a bulleted list of all of the positive ideas from a list of product reviews that I've collected.  

        REVIEWS
        ${reviewIdeas}

        POSITIVE IDEAS:
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

const formatReviews = (reviews: any): string => {
  let formattedReviews = "";

  reviews.forEach((review: any) => {
    let newReview = ("TITLE: " + review.title + "BODY: " + review.body).split(
      ""
    );
    let existingReviews = formattedReviews.split("");
    let charCount = newReview.length + existingReviews.length;

    if (charCount < 10000)
      formattedReviews +=
        "TITLE: " + review.title + "\n" + "BODY: " + review.body + "\n\n";
  });

  return formattedReviews;
};
