import { json, LoaderFunction } from "@remix-run/server-runtime";
import Gun from 'gun'
import { useLoaderData } from "remix";

let gun = Gun({peers:[`http://localhost:${process.env.PORT || 8765}/gun`]})
export const loader: LoaderFunction = () => {
   let data = gun.get('text').on((data) => json(data) )
   return data
}

export default function NiceWork() {
  let data = useLoaderData<any>(); 
    return ( 
      <div>
        {data.map((key:any) => (
          <h1>
            {key.answer}
          </h1>
        ))}
      </div>
)
    }
