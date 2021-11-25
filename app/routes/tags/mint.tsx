import { LoaderFunction } from "@remix-run/server-runtime"

type TagData = {
  name: string;
  url: string;
  
}

const loader: LoaderFunction({param}: TagData) {

}

export default function Tags() {

  return( 
  <div>
    <h1>TAG DATA WILL SHOW HERE</h1>
  </div>
  )
}
