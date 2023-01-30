import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

//create a function that will generate the sitemap
export const generateSitemap = async () => {
  //fetch all the blog posts
  const posts = await retrievePosts();

  //create the sitemap
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
          .map(({ slug }) => {
            return `
                <url>
                    <loc>${`https://www.example.com/posts/${slug}`}</loc>
                </url>
                `;
          })
          .join("")}
        </urlset>
    `;

  //write the file to the public folder
  fs.writeFileSync("public/sitemap.xml", sitemap);
};

const retrievePosts = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir("posts", async (err, files) => {
      if (err) {
        reject(err);
      }

      let list: any[] = [];

      for (let i = 0; i < files.length; i++) {
        let filename = files[i];
        const filePath = path.join("posts", filename);
        const fileContents = await fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        if (data.date) data.date = dayjs(data.date).format("MMMM D, YYYY");
        if (list.length < 10) {
          list.push(data);
        }
      }

      resolve(list);
    });
  });
};
