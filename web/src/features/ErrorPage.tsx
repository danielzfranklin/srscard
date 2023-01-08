import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Error {error.statusText}</h1>
      <p> {error.message} </p>
    </div>
  );
}
