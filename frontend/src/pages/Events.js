import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return <EventsList events={events} />;
}

export default EventsPage;

// code below is executed on client side (browser)

// when we return res as Response object from loader function react-router-dom will extract data automatically -> 'ANY DATA' when using useLoaderData
export async function loader() {
  const response = await fetch("http://localhost:8080/eventssss");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events." };
    //throw { message: "Could not fetch events..............." };
  } else {
    return response;
  }
}
