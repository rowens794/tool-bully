import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

import data from "../utils/sitedata";

function generateSiteMap(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${data.url}</loc>
     </url>
     <url>
       <loc>${data.url}/about-me</loc>
     </url>
     <url>
       <loc>${data.url}/posts</loc>
     </url>
     ${posts
       .map((post: any) => {
         return `
       <url>
           <loc>${`${data.url}/posts/${post.slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap({ sitemap }: { sitemap: any }) {
  // We return the XML sitemap as xml
  return (
    <div>
      <p>no content</p>
    </div>
  );
}

export async function getStaticProps() {
  // We make an API call to gather the URLs for our site
  const posts = await retrievePosts();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  //save the sitemap to a file in the public folder
  fs.writeFileSync("public/sitemap.xml", sitemap);

  return {
    props: {
      sitemap,
    },
  };
}

export default SiteMap;

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
        list.push(data);
      }

      resolve(list);
    });
  });
};
