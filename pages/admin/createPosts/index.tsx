import React from "react";
import axios from "axios";

type Props = {};

export default function index({}: Props) {
  const fields = [];
  for (let i = 0; i < 10; i++) {
    fields.push(
      <input
        key={i}
        type="text"
        name={i.toString()}
        id={i.toString()}
        className="block w-full min-w-0 flex-1 rounded-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    );
  }

  const handleClick = async () => {
    //get product ids from input fields
    const productIds = [];
    for (let i = 0; i < 10; i++) {
      const element = document.getElementById(i.toString());
      //@ts-ignore
      if (element && element.value !== "") {
        //@ts-ignore
        productIds.push(element.value);
      }
    }

    await writePosts(productIds);

    console.log(productIds);
  };

  return (
    <div className="max-w-5xl mx-auto py-24">
      <p>Enter up to 10 amazon pages to create</p>
      <div className="max-w-md flex gap-2 flex-col">{fields}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
        onClick={handleClick}
      >
        Create
      </button>
    </div>
  );
}

const writePosts = async (productIds: string[]) => {
  return new Promise(async (res, rej) => {
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      await axios.post(
        `http://localhost:3000/api/write-product-review/${productId}`,
        {
          productId,
        }
      );
    }

    res(null);
  });
};
