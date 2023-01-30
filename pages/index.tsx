import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

import site from "../utils/sitedata";
import Navigation from "../components/header";
import { PostMeta } from "./api/write-product-review/[productID]";
import PostCard from "../components/postCard";
import Footer from "../components/footer";

interface Props {
  posts: PostMeta[];
  mostRecent: string;
}

export default function Example({ posts, mostRecent }: Props) {
  return (
    <>
      <Head>
        <meta name="description" content={site.tagline} />
        <title>{site.name}</title>
      </Head>
      <div className="bg-white">
        <Navigation />
        <main className="mx-4 mx-auto">
          <Hero mostRecent={mostRecent} />
          <h2 className="max-w-5xl mx-auto ">Recent Posts</h2>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 px-8">
            {posts.map((post) => (
              <PostCard post={post} key={post.productID} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

const Hero = ({ mostRecent }: { mostRecent: string }) => {
  return (
    <div className="relative px-6 lg:px-8">
      <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
        <div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
              We release custom projects, tutorials, tool reviews, every so
              often.
            </p>
            <div className="mt-8 flex gap-x-4 sm:justify-center flex-col sm:flex-row gap-2">
              <Link
                href={`/posts/${mostRecent}`}
                className="inline-block rounded-lg bg-primary-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-primary-600 hover:bg-primary-700 hover:ring-primary-700"
              >
                Most Recent Post
                <span className="text-primary-200" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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

      resolve(list);
    });
  });
};
