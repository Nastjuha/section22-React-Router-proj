import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  // will trigger the action, but NO route transition
  // fetcher -> whenever we want to trigger an action or a loader without navigating to a route, to which that action or loader belongs

  // if we want to interract with some action or loader without transitioning
  // if we want to send a request behind the scenes without triggering route change
  const { data, state } = fetcher; // state can be 'idle', 'submitting', 'loading'
  // state tells us wheather the fetcher behind the scenes completed

  //state === 'submitting' // when the request is being sent its loader or action, that was triggered

  useEffect(() => {
    // state === "idle" means that we not executing a loader or anymore
    if (state === "idle" && data && data.message) {
      // window.alert("Signup successful!");
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter" // because we know that we want to trigger the action of this /newsletter route. but we don't want to render a component for that route
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
