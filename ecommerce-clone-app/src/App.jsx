/**
  Project: E-Commerce Platform (Edcucational Clone)
  Tech Stack: React, Context API, Firebase (Auth + Hosting), Stripe for payment
  Disclaimer: This project is for educational purposes only and is not affiliated with or
  endorced by any real-world companies 
 */
// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/login";
import Payment from "./components/Payment";
// import Orders from "./components/Orders"; // Future route placeholder

import { auth, db } from "./firebase";
import { useStateValue } from "./components/StateProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import { messages } from "./messages";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
import { collection, getDocs, doc } from "firebase/firestore";
const stripePromise = loadStripe("your-publishable-key-here");

// Handles routing and conditional layouts
function AppContent() {
  const location = useLocation();
  const [{ user }, dispatch] = useStateValue();
  const [locale, setLocale] = useState(navigator.language.split(/[-_]/)[0]);

  /**
   * The useEffect in App.jsx is focused on maintaining the user's authentication state
   * throughout the app's lifecycle. It ensures that the app behaves consistently,
   * whether the user is logging in for the first time or returning to an existing session.
   * This useEffect monitors the overall authentication status and keeps the global state
   * synchronized across sessions.
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });

        try {
          const basketRef = collection(db, "users", authUser.uid, "basket");
          const basketSnapshot = await getDocs(basketRef);
          const basket = basketSnapshot.docs.map((doc) => doc.data());

          dispatch({ type: "SET_BASKET", basket });
        } catch (error) {
          console.error("Error fetching basket: ", error.message);
        }
      } else {
        dispatch({ type: "SET_USER", user: null });
        dispatch({ type: "SET_BASKET", basket: [] });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const hideHeaderOn = ["/login"];

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="app">
        {!hideHeaderOn.includes(location.pathname) && (
          <Header locale={locale} setLocale={setLocale} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </div>
    </IntlProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
