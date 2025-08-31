import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();
  // useRouteError returns the thrown error object
  // the shape of this object depends on wheather we threw a response or any other kind of object or data...
  //error.status; // 500

  // we can create these info vars with default values and override with more specific values depending on the error object we get
  let title = "An error occurred!!!!!!!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message; // error.data gives us access to the data that included in our error Response, e.g. to obj -> { message: "Could not fetch events." } and that obj has a 'message' prop
  }

  if (error.status === 404) {
    // 404 - default status by react-router-dom when we entered a path that is not supported
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
