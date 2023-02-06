import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

const fs = require("fs");

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit");
  let files = await getFiles();
  let contentArray = createContentArray(files);

  console.log(contentArray);

  res.status(200).json({ name: "John Doe" });
}

const getFiles = async (): Promise<string[]> => {
  return new Promise((res, rej) => {
    fs.readdir("./posts", async (err: any, files: any) => {
      if (err) throw err;
      let filesContainer = [];
      for (let i = 0; i < files.length; i++) {
        filesContainer.push(await getPost(files[i]));
      }

      res(filesContainer);
    });
  });
};

const getPost = async (file: string): Promise<string> => {
  return new Promise(async (res, rej) => {
    //read the file at the path
    fs.readFile(`./posts/${file}`, "utf-8", (err: any, data: any) => {
      if (err) throw err;
      res(data);
    });
  });
};

const createContentArray = (data: any) => {
  let content: string[] = [];
  data.forEach((d: any) => {
    d = matter(d);
    content.push(d.data.title);
  });

  return content;
};

const createJSONL = async (data: any) => {
  data.forEach((d: any) => {
    fs.appendFileSync("./fine-tunes/data.jsonl", JSON.stringify(d) + "\n");
  });
};
