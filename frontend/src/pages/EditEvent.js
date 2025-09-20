import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail");

  console.log(data.event);
  return <EventForm event={data.event} />;
}

export default EditEventPage;
