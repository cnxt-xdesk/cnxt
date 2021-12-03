import { json, Link, useLoaderData } from 'remix';
import { gun } from '~/utils/db/gun';
export let loader = () => {
    var postData = gun.get('posts')
    postData.put({slug:'my first rodeo', title: 'data.title.value'})
    
  return postData.once((data: any) => json(`slug: ${data.slug}, title: ${data.title}`) )
};

export default function Posts() {
  let post = useLoaderData();
  return (
    <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 m-12">
      <h1 className="font-bold text-blue-500 ">
        Add your tag to mint your metric token
      </h1>
      <form method="post">
        <div>
          <label>
            Name:{' '}
            <input
              className="bg-gray-100 bg-opacity-20 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-full focus:outline-none focus:ring"
              type="text"
              placeholder="Tag Name"
              name="name"
            />
          </label>
        </div>
        <div>
          <label>
            Name:{' '}
            <input
              className="bg-gray-100 bg-opacity-20  placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-full focus:outline-none focus:ring"
              type="text"
              placeholder="Creator"
              name="creator"
            />
          </label>
        </div>
        <div>
          <label>
            Name:{' '}
            <input
              className="bg-gray-100 bg-opacity-20 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-full focus:outline-none focus:ring"
              type="text"
              placeholder="https://"
              name="Link"
            />
          </label>
        </div>
        <div>
          <label>
            MetaData:{' '}
            <textarea
              className="bg-gray-100 bg-opacity-20 placeholder-gray-400 text-gray-400 text-sm py-1 px-5 rounded-md outline-none w-full focus:outline-none focus:ring"
              name="content"
            />
          </label>
        </div>
        <div>
          <div className="p-1 rounded-full text-gray-500">
            <button
              className="flex flex-row justify-center items-center p-2 rounded-full focus:ring-2 hover:bg-red-500 hover:bg-opacity-90 focus:outline-none"
              aria-label="Submit"
            >
              <svg className="fill-current h-4 w-4" viewBox="0 0 25 25">
                <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
              </svg>
              <p className="pl-3">Submit</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
