import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";

/**
 * Main entry point of the React application.
 *
 * This module renders the root component of the app into the DOM.
 * It wraps the App component with the Redux Provider to make the Redux store available throughout the app.
 *
 * @module main
 */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
