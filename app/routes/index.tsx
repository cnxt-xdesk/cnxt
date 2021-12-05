import Gun from 'gun';
import { json, LoaderFunction } from 'remix';
import { gun } from '~/utils/db/gun';
import { today } from '~/utils/dates';

import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://docs.remix.run"
      },
      {
        name: "React Router Docs",
        url: "reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      {
        to: "demos/about",
        name: "Nested Routes, CSS loading/unloading"
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries"
      }
    ]
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};


export function IconButton() {
  return (
    <button
      id="instagram"
      className="  hover:border-2 border-pink-500 bg-gradient-to-b text-2xl hover:from-indigo-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white bg-white text-pink-600 w-12 h-12  transform hover:-translate-y-3 rounded-full duration-500"
    >
      <i className="fas fa-hashtag "></i>
    </button>
  );
}

export default function TimeLine() {
  let data = useLoaderData<IndexData>();
  return (
    <div>
      <main>
        <h1 className="text-3xl text-center font-bold text-blue-500">
          Current Namespaces & Style Test
        </h1>
        <p>Bresnow may tell jokes but he doesnt play games 🥳</p>
        <p>
          This page should be showing the current tags loaded into the database and should link to the hash id.
          That is of course if the code isnt broken. If that be the case then wait.
        </p>
        {/* <p>
          Check out all the demos in this starter, and then just delete the{" "}
          <code>app/routes/demos</code> and <code>app/styles/demos</code>{" "}
          folders when you're ready to turn this into your next project.
        </p> */}
      </main>
      <aside>
        <div className="border-l-2 mt-10">
          <ul>
            {data.demos.map(demo => (
              <li key={demo.to} className="remix__page__resource">
                <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                  {/* <!-- Dot Follwing the Left Vertical Line --> */}
                  {/* <div className="w-5 h-5 bg-blue-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div> */}
                  <div className="absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0">
                    <IconButton />
                  </div>

                  {/* <!-- Line that connecting the box with the vertical line --> */}
                  <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

                  {/* <!-- Content that showing in the box --> */}
                  <div className="flex-auto">
                    <Link to={demo.to} prefetch="intent">
                      <h1 className="text-lg">{demo.name}</h1>
                    </Link>
                    <h1 className="text-xl font-bold">
                      {demo.name}
                    </h1>
                    <h3>{demo.to}</h3>
                  </div>
                  <ul>
                    {data.resources.map(resource => (
                      <li key={resource.url} className="remix__page__resource">
                        <a href={resource.url}>{resource.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      </div>


      );
}
