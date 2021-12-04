import { useCatch, Link, json, useLoaderData, Outlet } from 'remix';
import TimeLine from './index/timeline';

export function meta() {
  return { title: '❌ CNXT' };
}

export default function Boundaries() {
  return (
    <div className="remix__page">
      <main>
        <TimeLine />
      </main>
      {/*  */}
    </div>
  );
}
