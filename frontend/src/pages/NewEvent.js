import { redirect } from "react-router-dom";

import EventForm from "../components/EventForm";

function NewEventPage() {
  function submitHandler(event) {
    event.preventDefault();
  }

  return <EventForm />;
}

export default NewEventPage;

// this code executes on client side (We can use any browser API here like localStorage)

// react-router will execute action function and f receives the object, that contains request and params properties
// request object contains form data
export async function action({ request, params }) {
  const data = await request.formData();

  // to get access to the input field values that were submitted - use get method on formData object
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  // react-router makes handling form submissions easy, extracting data from form.
  // For that being possible - each field in the form must have a name attribute, on all input fields and textareas.
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event." }), {
      status: 500,
    });
  }

  // redirect is a special f from r-r; creates a special response object
  // that returns a special response instructing react-router to redirect the user to a different page
  return redirect("/events");
}
