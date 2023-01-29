import React from "react";
import Image from "next/image";
import dayjs from "dayjs";

type Props = {
  images: string;
  postTitle: string;
  author: string;
  authorImage: string;
  date: string;
};

export default function index({
  images,
  postTitle,
  author,
  authorImage,
  date,
}: Props) {
  let imageArr = images.split(" | ");
  console.log(imageArr);

  return (
    <div className="relative mt-16">
      <div className="max-w-5xl mx-auto my-16 grid grid-cols-2 py-8 px-8 shadow-2xl aspect-video overflow-hidden">
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
      <AuthorBlock author={author} authorImage={authorImage} date={date} />
      <h1
        className={`absolute bottom-6 left-8 z-20 font-extrabold w-3/4 text-white `}
      >
        <span className="bg-yellow-500 block p-2">{postTitle}</span>
      </h1>

      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-primary-700 to-secondary-600 opacity-75 z-10 shadow-lg" />
    </div>
  );
}

const AuthorBlock = ({
  author,
  authorImage,
  date,
}: {
  author: string;
  authorImage: string;
  date: string;
}) => {
  const dateStr = dayjs(date).format("MMMM DD, YYYY");

  return (
    <div className="flex items-center space-x-2 absolute top-4 left-4 z-20">
      <Image
        className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
        width={48}
        height={48}
        src={authorImage}
        alt=""
      />
      <div className="">
        <span className="text-secondary-100 text-md block">{author}</span>
        <span className="text-primary-300 text-sm font-light block">
          {dateStr}
        </span>
      </div>
    </div>
  );
};
