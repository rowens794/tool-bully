import { useState, useEffect } from "react";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { extractDocDetails } from "../../../utils/extractDocDetails";
import { removeDocDetails } from "../../../utils/removeDocDetails";
import Hero from "../../../components/postHero";
import BuyButton from "../../../components/buyButton";
import Image from "../../../components/image";
import Navigation from "../../../components/header";
import Footer from "../../../components/footer";

type Props = {
  source: any;
  meta: {
    title: string;
    productID: string;
    excerpt: string;
    slug: string;
    date: string;
    author: string;
    name: string;
    authorImage: string;
    heroImages: string;
  };
};

export default function Index({ source, meta }: Props) {
  const [pageSource, setPageSource] = useState(null);
  const components = { Image, BuyButton };

  useEffect(() => setPageSource(source), [source]);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navigation />
      </div>
      <div className="max-w-5xl mx-auto">
        {pageSource ? (
          <>
            <Hero
              images={meta.heroImages}
              postTitle={meta.title}
              author={meta.author}
              authorImage={meta.authorImage}
              date={meta.date}
            />
            <div className="max-w-4xl mx-auto">
              {/*@ts-ignore */}
              <MDXRemote {...pageSource} components={components} />
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

//generate all of the paths
export async function getStaticPaths() {
  const files = fs.readdirSync("posts");

  return {
    paths: files.map((file) => ({
      params: { slug: file.replace(".mdx", "") },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  let file = fs.readFileSync(`posts/${context.params.slug}.mdx`, "utf8");

  const docDetails = extractDocDetails(file);
  const cleanedSource = removeDocDetails(file);

  const mdxSource = await serialize(cleanedSource);
  return { props: { source: mdxSource, meta: docDetails } };
}
