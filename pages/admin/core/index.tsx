import Link from "next/link";
import { useState } from "react";
import dbConnect from "../../../utils/dbConnect";
import Generation from "../../../models/Generation";
import Sidebar from "../../../components/adminSidebar";
import SlideOver from "../../../components/slideOver";

// import { PlusIcon } from "heroicons-react/outline";

export default function Example() {
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <Sidebar />
        </div>
      </div>
      <BodyContainer />
    </>
  );
}

const BodyContainer = () => {
  const [newComponentOpen, setNewComponentOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col md:pl-64">
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Core Components
            </h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <BodyContent setOpen={setNewComponentOpen} />
          </div>
        </div>
        <SlideOver open={newComponentOpen} setOpen={setNewComponentOpen}>
          <NewComponentContent />
        </SlideOver>
      </main>
    </div>
  );
};

const BodyContent = ({ setOpen }: { setOpen: Function }) => {
  return (
    <div className="py-4">
      <p>
        Each of the Core Components are required for post generation. The OpenAI
        requests can be modified to fit needs - but the content must be
        generated.
      </p>
      <div className="rounded-lg border-4 border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <CreateNewComponent setOpen={setOpen} />
      </div>
    </div>
  );
};

const ComponentCard = () => {
  return (
    <div className="bg-gray-100 border-2 border-gray-300 rounded-md h-72 w-64 p-4 flex flex-col justify-between">
      <div>
        <span className="block text-center font-semibold py-2">
          Title Generation
        </span>

        <span className="block text-center py-2 text-sm">
          This component generates a simplified title of the product.
        </span>
      </div>
      <Link
        href={`/23oijfwef`}
        className="mx-auto border-2 rounded border-gray-300 py-1 px-4 text-gray-500 font-light"
      >
        Edit Component
      </Link>
    </div>
  );
};

const CreateNewComponent = ({ setOpen }: { setOpen: Function }) => {
  return (
    <div className="bg-gray-100 border-2 border-gray-300 rounded-md h-72 w-64 p-4 flex flex-col justify-between">
      <div>
        <span className="block text-center font-semibold py-2">
          Create New Component
        </span>
      </div>
      {/* <PlusIcon width={84} height={84} className="mx-auto text-gray-500" /> */}

      <span
        onClick={() => setOpen(true)}
        className="block cursor-pointer mx-auto border-2 rounded border-gray-300 py-1 px-4 text-gray-500 font-light"
      >
        Create Component
      </span>
    </div>
  );
};

export async function getServerSideProps() {
  let db = await dbConnect();

  //get generations from mongodb
  //@ts-ignore
  const generations = await Generation.find({});
  console.log(generations);

  return {
    props: {},
  };
}

const NewComponentContent = () => {
  return (
    <div className="absolute inset-0 px-4 sm:px-6">
      <form className="divide-y divide-gray-200">
        <div className=" divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg pt-0 mt-0 font-medium text-gray-900">
                Create New Component
              </h3>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Meta Information
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="component-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Component Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="component-name"
                    id="component-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="db-reference"
                  className="block text-sm font-medium text-gray-700"
                >
                  DB Value Reference
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="db-reference"
                    id="db-reference"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="object-reference"
                  className="block text-sm font-medium text-gray-700"
                >
                  Object Reference
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Product</option>
                    <option>Reviews</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Prompt
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
              <div className="">
                <label
                  htmlFor="component-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  OpenAI Prompt
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={12}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
