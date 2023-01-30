import React from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import data from "../../utils/sitedata";

type Props = {};

export default function index({}: Props) {
  return (
    <div className="relative translate-y-4">
      <div className="border-2 border-primary-600 pt-1 pb-2 px-2 rounded-md">
        <span className="text-primary-700 font-semibold">{data.name}</span>
      </div>
      <WrenchScrewdriverIcon className="w-6 h-6 text-primary-600 mx-auto -translate-y-3 bg-white" />
    </div>
  );
}
