import { useLoaderData, json } from "react-router-dom";

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

export async function loader() {
  const response = await fetch("http://localhost:8080/eventsddd");

  if (!response.ok) {
    //throw { message: "Could not fetch events..............." };
    // we can get hold of the data that being thrown as an error inside of the component that was rendered as error element, in this case ErrorPage component

    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      // we prefer to throw a response so as error object has "status" prop and later we can build a generic error handling component
      status: 500,
    });
  } else {
    return response;
  }
}
