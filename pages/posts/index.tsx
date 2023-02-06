import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

import { PostMeta } from "../api/write-product-review/[productID]";

import Navigation from "../../components/header";

interface Props {
  posts: PostMeta[];
  mostRecent: string;
}

export default function Example({ posts, mostRecent }: Props) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={"Helping woodworkers build their dream projects"}
        />
        <title>The Tool Bully</title>
      </Head>
      <div className="isolate bg-white">
        <Navigation />
        <main>
          <BlogPosts posts={posts} />
        </main>
      </div>
    </>
  );
}

const BlogPosts = ({ posts }: { posts: any[] }) => {
  return (
    <div className="bg-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Most Recent Posts
          </h2>
        </div>
        <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          {posts.map((post) => (
            <div key={post.title}>
              <p className="text-sm text-gray-500">
                {/* <time dateTime={post.date}>{post.date}</time> */}
              </p>
              <a href={`/posts/${post.slug}`} className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
              </a>
              <div className="mt-3">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-base font-semibold text-primary-600 hover:text-primary-500"
                >
                  Read full story
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = await retrievePosts();
  //@ts-ignore
  const mostRecent = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0].slug;

  return {
    props: {
      posts: posts,
      mostRecent,
    },
  };
}

const retrievePosts = async () => {
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

      console.log(list);

      resolve(list);
    });
  });
};
