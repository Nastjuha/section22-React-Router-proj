import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // through useNavigation() hook we can get access to the data that was submitted through a form, also get what the current status of currently active transition is
  // we have transition when we clicked a Link OR submitted a form

  // if state is submitting => the action we triggered is still active
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    // Form will make sure that the browser default of sending a request to the server on form submission will be omitted, BUT
    // it will take that request and send it to the action function defined for the route that rendered this component
    <Form method={method} className={classes.form}>
      {/* data won't be set if we haven't submitted form yet; (data is coming from an action) */}
      {/* ch ecking for 'data' <=> if I submitted a form and an action returned some data, then check if i have nested obj - errors in my data */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// request object contains form data
export async function action({ request, params }) {
  console.log("EventForm action: ", request, "params: ", params);
  const method = request.method; // POST or PATCH
  const data = await request.formData();

  // to get access to the input field values that were submitted - use get method on formData object
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  // in case we are editing an existing event
  if (method === "PATCH") {
    const eventId = params.eventId; // "eventId" because in route definition we used ":eventId"
    url += `/${eventId}`;
  }

  const response = await fetch(url, {
    method: method,
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

  return redirect("/events");
}
