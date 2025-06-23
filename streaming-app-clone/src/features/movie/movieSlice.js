import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing movie state.
 *
 * This slice contains the initial state for different categories of movies such as recommend, new Disney,
 * original, and trending, along with a reducer to set these movie categories. It also exports actions and
 * selectors to be used in components for interacting with the movie state.
 *
 * @module movieSlice
 */

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    },
  },
});

// Export the actions to be used in components
export const { setMovies } = movieSlice.actions;

// Selectors to get the movies details from the state
export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;
