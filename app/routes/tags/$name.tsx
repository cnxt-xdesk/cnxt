import { useCatch, Link, json, useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';

import { gun } from '~/utils/db/gun';
import { today } from '~/utils/dates';
// interface KeyPair {
//   pub: String;
//   priv: String;
//   epub: String;
//   epriv: String;
// }
// interface User {
//   name: String;
//   id: keyof KeyPair;
//   profile: ProfileData;
// }

// interface ProfileData {
//   url: String;
// }

// interface TokenData {
//   name: String;
//   tag_hash: keyof KeyPair['pub'];
//   description: String;
//   mint_date: String;
//   display_name: String;
// }

// interface Services {
//   name: String;
//   id: String;
// }
export function IconButton() {
  return (
    <button
      id="instagram"
      className="  hover:border-2 border-pink-500 bg-gradient-to-b text-2xl hover:from-indigo-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white bg-white text-pink-600 w-12 h-12  transform hover:-translate-y-3 rounded-full duration-500"
    >
      <i className="fas fa-hashtag"></i>
    </button>
  );
}

let token = gun.get('tokens/v1').get('token');
export let loader: LoaderFunction = ({ params }) => {
  token.get(`${params.name}`);
  let data = token.map().on((data) => {
    console.log(data);
  });

  if (params.id === 'this-record-does-not-exist') {
    // If the record doesn't exist we can't render the route normally, so
    // instead we throw a 404 reponse to stop running code here and show the
    // user the catch boundary.
    throw new Response('Not Found', { status: 404 });
  }

  // now pretend like the record exists but the user just isn't authorized to
  // see it.
  if (params.id === 'shh-its-a-secret') {
    // Again, we can't render the component if the user isn't authorized. You
    // can even put data in the response that might help the user rectify the
    // issue! Like emailing the webmaster for access to the page. (Oh, right,
    // `json` is just a Response helper that makes it easier to send JSON
    // responses).
    throw json({ webmasterEmail: 'hello@remix.run' }, { status: 401 });
  }

  // Sometimes your code just blows up and you never anticipated it. Remix will
  // automatically catch it and send the UI to the error boundary.
  if (params.id === 'kaboom') {
    lol();
  }

  // but otherwise the record was found, user has access, so we can do whatever
  // else we needed to in the loader and return the data. (This is boring, we're
  // just gonna return the params.id).
  return { param: data };
};

export default function ParamDemo() {
  let data = useLoaderData();
  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-blue-500">
        Current Namespaces
      </h1>
      <div className="border-l-2 mt-10">
        {/* <!-- Card 1 --> */}
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
            <h1 className="text-lg">Day 1</h1>
            <h1 className="text-xl font-bold">
              Orientation and Briefing on Uniliver basics
            </h1>
            <h3>Classroom</h3>
          </div>
          <a href="#" className="text-center text-white hover:text-gray-300">
            Download materials
          </a>
        </div>
      </div>
    </div>
  );
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found
export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

// https://remix.run/api/conventions#errorboundary
// https://remix.run/api/guides/not-found
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : 'Oops...',
  };
};
function lol() {
  throw new Error('Function not implemented.');
}
