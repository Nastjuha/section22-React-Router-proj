import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

// we added a loader in App.js for this component, so we can use useLoaderData() hook to access the data returned by that loader function
function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

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
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// react-router (calls loader() for us) actually passes an object to the loader function with 2 props: request and params
// with the help of 'params' we can access all the route parameters values, as we can do the same in the component with useParams() hook
export async function loader({ request, params }) {
  const id = params.eventId;

  return {
    event: await loadEvent(id), // we need to await here because we want to have the event data before rendering the component
    // we want to tell r-r to wait displaying EventDetail page, untill the details have been loaded: the navigation should start once
    // the details have been loaded - > await -> waiting for that data to be loaded before loading this page component at all
    // (before moving & navigating to this page component)
    // will load "loadEvents()" data AFTER the page was loaded
    events: loadEvents(), // we don't need to await here because we can render the component without having the list of events
  };
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
