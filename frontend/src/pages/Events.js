import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

// code below is executed on client side (browser)

// when we return res as Response object from loader function react-router-dom will extract data automatically -> 'ANY DATA' when using useLoaderData
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json(); // we don't need manually extract data anymore
    // useLoaderData will get data that is part of the Response

    // fetch function returns a promise, that is resolved to Response. so here we can just return it, and not creating new Response.
    return response;
    // react-router will extract data from it automatically
  }
}
