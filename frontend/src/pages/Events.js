import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    // Suspense c is used to provide a fallback whilst data is about to arrive
    // here we show Suspense to wait while we are waiting this events to be fetched
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
        {/* we have to provide a f, that r-r will execute once the promise is resolved */}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

export async function loader() {
  return {
    events: loadEvents(), // returns a promise, we store it in "events" key
  };
}
