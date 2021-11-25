import { useEffect, useRef } from "react";
import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import Gun from "gun";



let gun = Gun({ peers: [`http://localhost:3000/gun`] });

export function meta() {
  return { title: "Tags" };
}

// When your form sends a POST, the action is called on the server.
// - https://remix.run/api/conventions#action
// - https://remix.run/guides/data-updates
export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
// gun.get("text").put(formData);
  return console.log(JSON.stringify(formData))
  


  // Typical action workflows start with validating the form data that just came
  // over the network. Clientside validation is fine, but you definitely need it
  // server side.  If there's a problem, return the the data and the component
  // can render it.
  // if (typeof answer !== "string") {
  //   return json("Come on, at least try!", { status: 400 });
  // }

  // if (answer !== "egg") {
  //   return json(`Sorry, ${answer} is not right.`, { status: 400 });
  // }

  // Finally, if the data is valid, you'll typically write to a database or send or
  // email or log the user in, etc. It's recommended to redirect after a
  // successful action, even if it's to the same place so that non-JavaScript workflows
  // from the browser doesn't repost the data if the user clicks back.
  
};
// export const loader: LoaderFunction = () => {
//   return gun
//     .get("text")
//     .once((data) => console.log(json(data)));
// };

export default function ActionsDemo() {
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
        <h2>Actions!</h2>
        <p>
          This form submission will send a post request that we handle in our
          `action` export. Any route can export an action to handle data
          mutations.
        </p>
        <Form method="post" className="remix__form">
          <h3>Post an Action</h3>
          <p>
            <i>What is more useful when it is broken?</i>
          </p>
          <label>
            <div>Answer:</div>
            <input ref={answerRef} name="answer" type="text" />
          </label>
          <div>
            <button>Answer!</button>
          </div>
          {actionMessage ? (
            <p>
              <b>{actionMessage}</b>
            </p>
          ) : null}
        </Form>
        
      </main>

  
    </div>
  );
}
