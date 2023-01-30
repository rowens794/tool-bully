import React from "react";
import Image from "next/image";
import Link from "next/link";

import { PostMeta } from "../../pages/api/write-product-review/[productID]";

type Props = {
  post: PostMeta;
};

export default function index({ post }: Props) {
  let imageArr = post.heroImages.split(" | ");

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="relative mt-16 group border border-primary-700 rounded-sm"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 py-8 px-8 shadow-2xl aspect-video overflow-hidden">
        <Image
          src={`/postImages/${imageArr[0]}`}
          alt="hero1"
          width={400}
          height={300}
          className="mx-auto bg-blue-500 bg-blend-overlay"
        />
        <Image
          src={`/postImages/${imageArr[1]}`}
          alt="hero1"
          width={400}
          height={300}
          className="mx-auto "
        />
      </div>
      <div className="bg-primary-50 absolute -bottom-8 -left-4 z-20  w-3/4 py-2 text-primary-900 rounded-sm border border-primary-700 group-hover:scale-105 transition-transform shadow-2xl">
        <h4 className={`  text-sm `}>
          <span className="block font-light mb-2 mx-2">{post.title}</span>
        </h4>
        <span className="text-xs font-light ml-4 hidden sm:block">
          By: {post.author}
        </span>
        <span className="hidden sm:block text-xs font-light ml-4">
          {post.date}
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-700 to-secondary-600 opacity-75 z-10 shadow-lg" />
    </Link>
  );
}
