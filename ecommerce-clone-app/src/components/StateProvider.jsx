// Setup data layer
// WE need this to track the basket

import { createContext, useContext, useReducer } from "react";
// This is the data layer
export const StateContext = createContext();

// Build a provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// // This is how we use it inside a component
export const useStateValue = () => useContext(StateContext);

// the following components use this export:
// App.jsx: Purpose: Used to manage and maintain the global authentication state across the app.
// const [{ user }, dispatch] = useStateValue();

// Header.jsx: Purpose: Used to access the global user state, which can influence what is shown in the header, like the user's name or logout option.
// const [{ basket, user, userAddress, name }, dispatch] = useStateValue(); // Accessing userAddress from state

// Login.jsx: Purpose: Used to update the global state with user input (like contact info, password, etc.) and to store the authenticated user information after login or registration.
// const [{ contactInfo, password, name, reEnterPassword, address }, dispatch] = useStateValue();
