import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "../header";

type Props = {};

export default function index({}: Props) {
  return (
    <div className="pt-8 mt-32 pb-8 max-w-5xl mx-auto border-gray-300 border-t ">
      <div className="flex justify-center gap-12">
        {[...navigation, { name: "Privacy", href: "/privacy" }].map((item) => {
          return (
            <Link
              href={item.href}
              key={item.name}
              className="font-light text-gray-600 hover:text-primary-700 text-sm"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
