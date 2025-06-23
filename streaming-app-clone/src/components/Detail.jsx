/**
 * Detail Component
 *
 * This component fetches and displays detailed information about a selected movie
 * from Firebase Firestore using the movie ID from the URL parameters. The fetched
 * data includes images, titles, descriptions, and metadata specific to the movie.
 *
 * The component also includes various controls for user interactions such as playback,
 * trailers, adding to a watchlist, and social interactions (like, dislike, share, download).
 * The icons for these controls are stored locally within the app's assets.
 *
 * The component makes use of the following hooks and methods:
 * - `useParams`: to extract the movie ID from the URL.
 * - `useState`: to manage the state of the movie details.
 * - `useEffect`: to perform data fetching on component mount and whenever the movie ID changes.
 * - `getDoc` from Firebase: to fetch the movie document from the Firestore database.
 *
 * The component structure includes:
 * - `Container`: Main wrapper for the component.
 * - `Background`: Displays the background image of the movie.
 * - `ImageTitle`: Displays the title image of the movie.
 * - `ContentMeta`: Wrapper for the meta information and controls.
 * - `Controls`: Contains buttons for Play, Trailer, Add to List, Group Watch, Like, Dislike, Share, and Download.
 * - `SubTitle`: Displays the subtitle of the movie.
 * - `Description`: Displays the description of the movie.
 *
 * @component
 * @example
 * return (
 *   <Detail />
 * )
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase";
import styled from "styled-components";

const Detail = (props) => {
  const { id } = useParams();
  // console.log("Fetched ID:", id);

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "movies", id); // Reference to the document
        const docSnap = await getDoc(docRef); // Fetch the document
        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.log("No such document in Firebase");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>
      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="Play icon" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="Trailer icon" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <span />
          </GroupWatch>
          <LikeButton>
            <span />
          </LikeButton>
          <DislikeButton>
            <span />
          </DislikeButton>
          <ShareButton>
            <span />
          </ShareButton>
          <DownloadButton>
            <span />
          </DownloadButton>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

export default Detail;

// Styled components
const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgba(249, 249, 249); /* Light grey/white background */
  border: none;
  color: rgb(0, 0, 0); /* Text color */

  img {
    width: 32px;
    margin-right: 8px;
  }

  &:hover {
    background: rgba(198, 198, 198); /* Slightly darker on hover */
    // border-color: rgba(249, 249, 249, 0.3); /* Darker border on hover */
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 22px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgb(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

// AddList, WatchList, GroupWatch, Like, Not my choice button, Share and Download buttons
const AddList = styled.div`
  position: relative; /* Required to position the tooltip */
  margin-right: 16px;
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Default background color */
  border-radius: 50%;
  border: 2px solid white; /* Default border color */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    border-color 0.3s ease;
  flex-shrink: 0; /* Prevents shrinking */
  min-width: 56px; /* Maintains minimum width */
  min-height: 56px; /* Maintains minimum height */

  &:hover {
    background-color: white; /* Change background to white on hover */
    border-color: black; /* Change border to black on hover */
    transform: scale(1.1); /* Slightly larger on hover */
  }

  span {
    position: absolute;
    background-color: white; /* Default color for + sign to ensure visibility */
    transition: background-color 0.3s ease; /* Smooth color transition */
  }

  /* Horizontal part of the + sign */
  span:first-child {
    height: 2px; /* Thickness of the horizontal bar */
    width: 25px; /* Width of the horizontal bar */
    transform: translate(-50%, -50%); /* Center horizontally and vertically */
    top: 50%;
    left: 50%;
  }

  /* Vertical part of the + sign */
  span:nth-child(2) {
    height: 25px; /* Height of the vertical bar */
    width: 2px; /* Thickness of the vertical bar */
    transform: translate(-50%, -50%); /* Center horizontally and vertically */
    top: 50%;
    left: 50%;
  }

  &:hover span:first-child,
  &:hover span:nth-child(2) {
    background-color: black; /* Change color to black on hover */
  }

  /* Tooltip styling */
  &::after {
    content: "Watchlist"; /* Tooltip text */
    position: absolute;
    top: -65px; /* Move above the button */
    left: 50%;
    transform: translateX(-50%);
    background: white; /* Tooltip background color on hover */
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 18px 0px;
    padding: 8px 12px;
    font-size: 16px;
    letter-spacing: 1.5px;
    color: black; /* Tooltip text color on hover */
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease; /* Smooth transitions */
    pointer-events: none; /* Prevent interaction with tooltip */
  }

  &:hover::after {
    opacity: 1; /* Show tooltip on hover */
  }

  /* Media queries for responsiveness */
  @media (max-width: 1024px) {
    height: 48px;
    width: 48px;
    margin-right: 12px;
    min-width: 48px; /* Adjusted minimum width */
    min-height: 48px; /* Adjusted minimum height */
    span {
      height: 20px;
      width: 20px;
    }
    &::after {
      font-size: 14px;
      top: -60px; /* Adjusted position */
    }
  }

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
    margin-right: 8px;
    min-width: 40px; /* Adjusted minimum width */
    min-height: 40px; /* Adjusted minimum height */
    span {
      height: 16px;
      width: 16px;
    }
    &::after {
      font-size: 12px;
      top: -50px; /* Adjusted position */
    }
  }

  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
    margin-right: 4px;
    min-width: 32px; /* Adjusted minimum width */
    min-height: 32px; /* Adjusted minimum height */
    span {
      height: 12px;
      width: 12px;
    }
    &::after {
      font-size: 10px;
      top: -40px; /* Adjusted position */
    }
`;

const LikeButton = styled.div`
  position: relative;
  margin-right: 16px;
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Default background */
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease, transform 0.3s ease;
  flex-shrink: 0; /* Prevents shrinking */
  min-width: 56px; /* Maintains minimum width */
  min-height: 56px; /* Maintains minimum height */

  &:hover {
    background-color: white; /* Change background to white on hover */
    border: 2px solid black; /* Change border to black on hover */
    transform: scale(1.1);
  }

  span {
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url("/images/like-icon2.svg") no-repeat center;
    background-size: contain;
    filter: invert(1) brightness(300%) contrast(100%); /* Ensure white icon color */
    transition: filter 0.3s ease; /* Smooth transition for filter changes */
  }

  &:hover span {
    filter: invert(0) brightness(0%) contrast(100%) sepia(1); /* Change icon color to black on hover */
  }

  &::after {
    content: "Like";
    position: absolute;
    top: -65px;
    left: 50%;
    transform: translateX(-50%);
    background: white; /* Tooltip background color on hover */
    color: black; /* Tooltip text color on hover */
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 18px 0px;
    padding: 8px 12px;
    font-size: 16px;
    letter-spacing: 1.5px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease, background-color 0.3s ease; /* Smooth transitions */
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
    transition-delay: 0.1s; /* Slight delay to ensure smooth appearance */
  }

  /* Media queries for responsiveness */
  @media (max-width: 1024px) {
    height: 48px;
    width: 48px;
    margin-right: 12px;
    min-width: 48px; /* Adjusted minimum width */
    min-height: 48px; /* Adjusted minimum height */
    span {
      height: 20px;
      width: 20px;
    }
    &::after {
      font-size: 14px;
      top: -60px; /* Adjusted position */
    }
  }

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
    margin-right: 8px;
    min-width: 40px; /* Adjusted minimum width */
    min-height: 40px; /* Adjusted minimum height */
    span {
      height: 20px;
      width: 20px;
    }
    &::after {
      font-size: 12px;
      top: -50px; /* Adjusted position */
    }
  }

  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
    margin-right: 4px;
    min-width: 32px; /* Adjusted minimum width */
    min-height: 32px; /* Adjusted minimum height */

    span {
      height: 12px;
      width: 12px;
    }
    &::after {
      font-size: 10px;
      top: -40px; /* Adjusted position */
    }
  }
`;

// Styles copied/applied from Like button
const DislikeButton = styled(LikeButton)`
  span {
    background: url("/images/dislike-icon2.svg") no-repeat center;
  }
  &::after {
    content: "Not my choice"; /* Tooltip text for Like button */
  }
`;
const GroupWatch = styled(LikeButton)`
  span {
    background: url("/images/group-icon2.svg") no-repeat center;
  }
  &::after {
    content: "Group watch"; /* Tooltip text for Like button */
  }
`;
const ShareButton = styled(LikeButton)`
  span {
    background: url("/images/share-icon2.svg") no-repeat center;
  }
  &::after {
    content: "Share"; /* Tooltip text for Like button */
  }
`;
const DownloadButton = styled(LikeButton)`
  span {
    background: url("/images/download-icon2.svg") no-repeat center;
  }
  &::after {
    content: "Download"; /* Tooltip text for Like button */
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min_height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249 249 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
