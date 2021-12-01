import { json, LoaderFunction } from "@remix-run/server-runtime"
import { useEffect, useReducer } from "react";
import { useLoaderData } from "remix"
import {tags} from '../../../lib/gun'
type TagData = {
  name: string;
  url: string;
  
}

const initialState = {
  tags: [{ data: {} }],
};

// Create a reducer that will update the tags array
function reducer(state: any, component: any) {
  return {
    tags: [component, ...state.tags],
  };
}


export default function Tags() {

 const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    tags.map().once((a: any) => {
      dispatch({
        name: a.name,
        url: a.url,
      });
    });
  }, [tags.map().off()]);

  return (
    <ul>
      {state ? state.tags.map((data) => (
        <li>
          <a href={`https://${data.url}`}>
            <p>#{data.name}</p>
            <p>url: {data.url}</p>
          </a>
        </li>
      )): null}
    </ul>
  );
}
