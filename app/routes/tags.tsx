import { useEffect, useRef } from 'react';
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from 'remix';
import { gun } from '~/utils/db/gun';

export let loader: LoaderFunction = async ({ request }) => {
  let form = await request.formData();
  let token = gun.get('tokens/v1').get('token');
  /* The mint data to load into the ledger */
  let mintData = {
    creator: form.get('creator'),
    url: form.get('url'),
    metadata: form.get('meta'),
  };

  /* load the data */

  return redirect(`/tags/${form.get('name')}`);
};
/** TODO: */

export default function Posts() {
  let param = useLoaderData<string>();

  // This form works without JavaScript, but when we have JavaScript we can make
  // the experience better by selecting the input on wrong answers! Go ahead, disable
  // JavaScript in your browser and see what happens.

  return (
    <div className="bg-gray-900 w-3/4 shadow justify-items-center rounded p-8 sm:p-12 m-12">
      <h1 className="text-3xl font-bold leading-7 text-center text-blue-500 ">
        Add your tag to mint your metric token
      </h1>
      <Form method="post">
        <div>
          <input
            className="bg-gray-100 m-5 bg-opacity-20 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-3/4 focus:outline-none focus:ring"
            type="text"
            placeholder="Tag Name"
            name="name"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 m-5 bg-opacity-20  placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-3/4 focus:outline-none focus:ring"
            type="text"
            placeholder="Creator"
            name="creator"
          />
        </div>
        <div>
          <input
            className="bg-gray-100 m-5 bg-opacity-20 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-3/4 focus:outline-none focus:ring"
            type="text"
            placeholder="https://"
            name="url"
          />
        </div>
        <div>
          <textarea
            placeholder="Other MetaData:"
            className="bg-gray-100 m-5 bg-opacity-20 h-60 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-3/4 focus:outline-none focus:ring"
            name="meta"
          />
        </div>
        <div>
          <div className="p-1 rounded-full text-gray-500">
            <button
              className="flex flex-row justify-center items-center p-2 rounded-md focus:ring-2 hover:bg-red-500 hover:bg-opacity-90 focus:outline-none"
              aria-label="Submit"
            >
              <svg className="fill-current h-4 w-4" viewBox="0 0 25 25">
                <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
              </svg>
              <p className="px-3">Submit</p>
            </button>
          </div>
        </div>
      </Form>
      <aside>
        {param ? (
          <Link to={`${param}`}>
            <p>View token data for: </p>
            <b>{param}</b>
          </Link>
        ) : null}
        <Outlet />
      </aside>
    </div>
  );
}
