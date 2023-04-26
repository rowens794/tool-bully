const { Configuration, OpenAIApi } = require("openai");
import { dataDbConnection } from "../../utils/dbConnect";

export const createHumanReadableName = async (
  rawProductName: string
): Promise<string> => {
  return new Promise(async (res, rej) => {
    console.log("creating human readable name");
    console.log(rawProductName);

    let humanReadableName = await makeOpenAIRequest(rawProductName);

    //save the generation to the database
    let db = await dataDbConnection();
    //@ts-ignore
    await db.collection("generations").insertOne({
      asin: "",
      product: "",
      generationID: "",
      generationType: "humanReadableName",
      generationInput: rawProductName,
      generationOutput: humanReadableName,
      requires: [],
    });

    res(humanReadableName);
  });
};

const makeOpenAIRequest = async (rawProductName: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    let prompt = `
    I need to create a simplified yet specific name for products that don't sound like I copied and pasted them from an amazon product page.  Some examples of inputs and outputs are below:

    - Anyyion 18-Inch Tool box with Removable Tray with Stainless Steel Dual Lock Secured ,Small Parts Box, Metal Handle is Truly Rugged（18In）should become Anyyion 18-Inch Tool box
    - Goplus 22-Inch Metal Tool Box, 3-Layer 5-Tray Portable Folding Tool Chest Organizer with Handle & Lock Hole, Cantilever Toolbox for Garage Trunk Household Office, Powder Coated Steel should become Goplus 22-Inch Tool Box
    - BLACK+DECKER 20V MAX* POWERCONNECT Cordless Jig Saw (BDCJS20C) should become Black + Decker PowerConnect Jig Saw
    - SKIL 15 Amp 7-1/4 Inch Circular Saw with Single Beam Laser Guide - 5280-01 should become Skil Circular Saw
    - Gerber Gear 30-001364N Suspension-NXT, 15-in-1 Multitool Knife, Needle Nose Pliers Pocket Knife with Pocket Clip, EDC Gear, Steel should become Gerber Gear Multitool

    The tool I want to rename right now is the ${rawProductName}.

    Output:
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
