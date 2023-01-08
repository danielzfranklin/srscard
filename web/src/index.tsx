import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Params, RouterProvider } from "react-router-dom";

import { RootState, store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { DeckPage } from "./features/deck/DeckPage";
import ErrorPage from "./features/ErrorPage";
import RootPage from "./features/RootPage";
import { selectDeck } from "./features/deck/decksSlice";

function makeHandle(
  crumb: (params: Readonly<Params<string>>, state: RootState) => string
) {
  return { crumb };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "deck",
        handle: makeHandle(() => "Decks"),
        children: [
          {
            path: ":deck",
            element: <DeckPage />,
            handle: makeHandle(
              (params, state) => selectDeck(params.deck!)(state).name
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
