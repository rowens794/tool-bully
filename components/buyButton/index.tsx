import React from "react";

type Props = {
  affiliateLink: string;
};

export default function index({ affiliateLink }: Props) {
  return (
    <div className="w-full text-center my-8">
      <a
        href={affiliateLink}
        target="_blank"
        rel="noreferrer"
        className="mx-auto bg-orange-500 text-white p-4 rounded cursor-pointer "
      >
        Check Price on Amazon
      </a>
    </div>
  );
}
