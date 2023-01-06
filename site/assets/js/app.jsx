import "../css/app.css";
// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";

import React from "react";
import ReactDOM from "react-dom/client";

import EditorApp from "./components/EditorApp.jsx";

const appContainer = document.querySelector("#app-container");
if (appContainer != null) {
    const propsJSON = appContainer.getAttribute("data-props") || "{}";
    const props = JSON.parse(propsJSON);

    const appName = appContainer.getAttribute("data-app");
    let App;

    if (appName === "editor") {
        App = <EditorApp {...props} />;
    } else {
        throw new Error(`Unrecognized appName: ${appName}`);
    }

    const root = ReactDOM.createRoot(appContainer);
    root.render(<React.StrictMode>{App}</React.StrictMode>);
}

