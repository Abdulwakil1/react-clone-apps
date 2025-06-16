//---Payment version---
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./components/StateProvider.jsx";
import reducer, { initialState } from "./reducer.js";
import { IntlProvider } from "react-intl";
import { messages } from "./messages";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your Stripe publishable key

const locale = navigator.language.split(/[-_]/)[0]; // Get browser language

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </IntlProvider>
    </StateProvider>
  </React.StrictMode>
);
