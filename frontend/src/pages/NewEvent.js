import EventForm from "../components/EventForm";

function NewEventPage() {
  function submitHandler(event) {
    event.preventDefault();
  }

  return <EventForm method="POST" />;
}

export default NewEventPage;
