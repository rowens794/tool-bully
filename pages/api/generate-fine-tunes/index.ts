import type { NextApiRequest, NextApiResponse } from "next";
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
  console.log(files);

  res.status(200).json({ name: "John Doe" });
}

const getFiles = async () => {
  return new Promise((res, rej) => {
    fs.readdir("./posts", (err: any, files: any) => {
      if (err) throw err;
      res(files);
    });
  });
};
