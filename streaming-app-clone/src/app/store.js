import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"; // Import auth slice reducer
import movieReducer from "../features/movie/movieSlice";

/**
 * Redux store configuration.
 *
 * This file sets up the Redux store for the application using Redux Toolkit's configureStore function.
 * It combines the reducers from the user and movie slices, allowing the application to manage and access
 * the state related to user authentication and movie data. It also applies middleware settings to handle
 * non-serializable data safely.
 *
 * @module store
 */

const store = configureStore({
  reducer: {
    user: userReducer, // Added auth slice to the reducer
    movie: movieReducer, // added movie slice to the reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
