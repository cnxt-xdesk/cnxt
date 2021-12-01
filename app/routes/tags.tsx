import { useEffect, useRef } from "react";
import { ActionFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { gun, tags } from "../../lib/gun";


 ;
export function meta() {
  return { title: "Tags" };
}

// When your form sends a POST, the action is called on the server.
// - https://remix.run/api/conventions#action
// - https://remix.run/guides/data-updates
export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let answer = {
    name: formData.get("name"),
    data: formData.get("data"),
    pub: formData.get("pub"),
    priv: formData.get("priv"),
  };


const _answer = tags.put(answer)

// console.log(_answer)

  if (typeof answer.name !== "string") {
    return json("Come on, at least try!", { status: 400 });
  }

return tags.map().on((a: any) => {
    json(_answer)
  });

}
 export default function ActionsDemo() {
  // let data = useLoaderData()
  // https://remix.run/api/remix#useactiondata
  let actionMessage = useActionData<string>();
  let answerRef = useRef<HTMLInputElement>(null);

  // This form works without JavaScript, but when we have JavaScript we can make
  // the experience better by selecting the input on wrong answers! Go ahead, disable
  // JavaScript in your browser and see what happens.
  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
    
  }, [actionMessage]);

  return (
    <div className="remix__page">
      <main>
        <h2>Post a Tag!</h2>
        <p>This form submission will send the tag data to the database.</p>
        <Form method="post" className="remix__form">
          <h3>Post an Action</h3>
          <p>
            <i>Just a matter of time</i>
          </p>
          <label>
            <div>Tag Handle:</div>
            <input ref={answerRef} name="name" type="text" />
          </label>

          <label>
            <div>Tag Data:</div>
            <input ref={answerRef} name="data" type="text" />
          </label>

          <label>
            <div>
              Public Key:<small> FOR AUTHENTICATION DEBUG</small>
            </div>
            <input ref={answerRef} name="pub" type="text" />
          </label>
          <label>
            <div>
              Public Key:<small> FOR AUTHENTICATION DEBUG</small>
            </div>
            <input ref={answerRef} name="priv" type="text" />
          </label>
          <div>
            <button>Secret Key:</button>
          </div>
        </Form>
      </main>
      <aside>
        {actionMessage ? (
          <p>
            <b>{actionMessage}</b>
          </p>
        ) : null}
      </aside>
    </div>
  );
}
