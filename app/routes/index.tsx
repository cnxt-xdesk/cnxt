import { useCatch, Link, json, useLoaderData, Outlet } from 'remix';

export function meta() {
  return { title: 'Boundaries Demo' };
}

export default function Boundaries() {
  return (
    <div className="remix__page">
      <main>
        <Outlet />
      </main>

      <aside className="bg-blue-700">
        <h1 className="text-center text-lg font-bold">
          Chris... if theres any links here you should click
        </h1>
        <ul className="m-5">
          <li>
            <Link to="/posts/updates">
              Update <i>12/3/21</i>
            </Link>
          </li>
          <li className=" text-red-700">
            <Link to="mint">
              <b>IMPERIAL TOKEN TRANSACTIONS</b>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
