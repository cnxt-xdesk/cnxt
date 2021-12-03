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
    <div>
 <h1 className='font-bold text-blue-500  '>Add your own hilarious joke</h1>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>)
}
