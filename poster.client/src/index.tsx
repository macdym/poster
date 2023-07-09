import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import reportWebVitals from "./reportWebVitals";
import { StoreContext, store } from "./app/store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/routes";
import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

reportWebVitals();
