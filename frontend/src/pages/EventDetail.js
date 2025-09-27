import { useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";

// we added a loader in App.js for this component, so we can use useLoaderData() hook to access the data returned by that loader function
function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

// react-router (calls loader() for us) actually passes an object to the loader function with 2 props: request and params
// with the help of 'params' we can access all the route parameters values, as we can do the same in the component with useParams() hook
export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event.",
      }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

// we can extract the method from "submitted form" by using request obj
export async function action({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    {
      // we should configue the request. we can dynamically extract the 'method' from a kind of 'form submission' we did in EventItem.js, by using request obj
      method: request.method, // request.method will be 'DELETE' here as we overrode it in EventItem.js
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not delete event.",
      }),
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
