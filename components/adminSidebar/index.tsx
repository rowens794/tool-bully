import React from "react";

type Props = {};

const items = [
  {
    name: "Core Components",
    href: "/admin/core",
  },
  {
    name: "Custom Components",
    href: "/admin/custom",
  },
  {
    name: "Posts",
    href: "/admin/posts",
  },
  {
    name: "Sections",
    href: "/admin/sections",
  },
  {
    name: "Templates",
    href: "/admin/templates",
  },
];

export default function index({}: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-700">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 ">
        <div className="flex flex-shrink-0 items-center px-4"></div>
        <nav className="pt-8 flex-1 space-y-1 px-2 ">
          {items.map((item) => {
            return (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 transition ease-in-out duration-150"
              >
                <span className="truncate">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
