/**
 * @component
 * @description
 * The `Home` component serves as the main landing page for the application. It integrates several sub-components
 * such as `ImgSlider`, `Viewers`, `Recommends`, `NewDisney`, `Originals`, and `Trending` to create the user
 * interface for exploring various types of content.
 *
 * This component manages the fetching of movie data from Firebase Firestore and uses Redux to update the global
 * state with the categorized movie lists: recommended, new Disney, original, and trending. The component also
 * includes an image background and padding to create a visually appealing layout.
 *
 * It subscribes to real-time updates from Firestore and cleans up the subscription when the component unmounts,
 * ensuring efficient data handling and rendering.
 *
 * @context
 * Utilizes Firebase Firestore for data fetching and Redux for state management. The `useEffect` hook is employed
 * to fetch and organize movie data into categories, while the `useDispatch` and `useSelector` hooks manage the
 * state within the application.
 *
 * @example
 * <Home />
 *
 * @see ImgSlider
 * @see Viewers
 * @see Recommends
 * @see NewDisney
 * @see Originals
 * @see Trending
 */

import styled from "styled-components";
import React from "react";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Treding";
// imports for working with firebase db, userSlice, and movieSlice
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection, onSnapshot } from "firebase/firestore";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const movieCollection = collection(db, "movies");
    const unsubscribe = onSnapshot(movieCollection, (snapshot) => {
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          default:
            break;
        }
      });

      // console.log("Recommends: ", recommends);
      // console.log("New Disneys: ", newDisneys);
      // console.log("Originals: ", originals);
      // console.log("Trending: ", trending);

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
