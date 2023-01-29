import React from "react";
import Image from "next/image";

type Props = { src: string; alt: string };

export default function index({ src, alt }: Props) {
  return (
    <div className="w-full">
      <Image
        src={`/postImages/${src}`}
        alt={alt}
        width={400}
        height={300}
        className="mx-auto rounded-md overflow-hidden my-8"
      />
    </div>
  );
}
