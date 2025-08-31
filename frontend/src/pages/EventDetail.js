import { useLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

// we added a loader in App.js for this component, so we can use useLoaderData() hook to access the data returned by that loader function
function EventDetailPage() {
  const data = useLoaderData();

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
