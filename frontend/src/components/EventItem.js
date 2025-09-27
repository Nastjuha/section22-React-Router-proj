import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit(); // returns a submit function

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    // 1st arg - data we want to submit and that will be automatically wrapped in a FormData object by react-router
    // and that data can be extracted with the help of request.formData() method
    // 2nd arg - allows to set the same values we could set on a <form> element like method, action, encType etc.
    if (proceed) {
      submit(null, { method: "delete" }); // 1st arg - formData (null here as we don't have any data to send).
    }

    // that is how we can programmatically submit a request without using a form element
    // submit data & trigger an action programmatically
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit" relative="path">
          Edit
        </Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
