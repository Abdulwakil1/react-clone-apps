import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing user state.
 *
 * This slice contains the initial state for user details such as name, email, and photo,
 * along with reducers to handle setting user login details and resetting the user state upon sign-out.
 * It also exports actions and selectors to be used in components for interacting with the user state.
 *
 * @module userSlice
 */

// Initial state for the user
const initialState = {
  name: "",
  email: "",
  photo: "",
};

// Create a slice of the Redux store for user-related actions and state
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the user login details
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    // Action to reset the user state when logging out
    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

// Export the actions to be used in components
export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

// Selectors to get the user details from the state
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;
