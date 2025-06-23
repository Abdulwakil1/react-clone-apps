/**
 * `Header` Component
 *
 * The `Header` component manages the navigation and authentication state of the application.
 *
 * - **Authentication Handling**: Utilizes Firebase's `onAuthStateChanged` to monitor changes in the user's
 *     authentication status. Redirects users based on their sign-in status and current route:
 *   - Redirects unauthenticated users from protected routes (e.g., `/home`, `/detail`) to the login page.
 *   - Redirects authenticated users from the login page or root route to the home page (`/home`).
 *
 * - **UI Elements**:
 *   - Displays login button when the user is not authenticated.
 *   - Shows navigation menu and user profile options (including sign-out) when the user is authenticated.
 *
 * This component ensures that only authenticated users can access protected routes and provides relevant
 * navigation options based on the authentication state.
 */

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  // Hooks for state and effects
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  // Authentication effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/home");
        }
      } else {
        if (
          location.pathname === "/home" ||
          location.pathname.startsWith("/detail")
        ) {
          navigate("/");
        }
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [userName, location.pathname, navigate]);

  // Authentication handler
  const handleAuth = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    console.log("Attempting authentication");

    try {
      if (!userName) {
        // Sign-in logic
        try {
          const result = await signInWithPopup(auth, provider);
          console.log("Sign in successful");

          // Dispatch user details to Redux store
          dispatch(
            setUserLoginDetails({
              name: result.user.displayName || "",
              email: result.user.email || "",
              photo: result.user.photoURL || "",
            })
          );

          // Update local state; Call setUser with the result.user
          setUser(result.user);
        } catch (error) {
          console.error("Sign-in error:", error.message);
          alert("Sign-in failed: " + error.message);
        }
      } else if (userName) {
        // Sign-out logic
        try {
          await auth.signOut();
          dispatch(setSignOutState());
          console.log("Sign out successful");
          navigate("/");
        } catch (error) {
          console.error("Sign-in error:", error.message);
          alert("Sign-out failed. Please try again.");
        }
      }
    } finally {
      setIsLoggingIn(false); // Ensure isLoggingIn is reset after sign-in or sign-out
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Logo" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth} disabled={isLoggingIn}>
          {isLoggingIn ? "Loading..." : "Login"}
        </Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

export default Header;

// Styled components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  // letter-spacing: normal;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    text-decoration: none; /* Ensure no underline for links */

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      text-decoration: none; /* Ensure no underline for text */

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgb(0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
`;

const UserImg = styled.img`
  height: 100%;
  // width: 50px; /* Set appropriate size */
  // height: 50px; /* Set appropriate size */
  // border-radius: 50%; /* Makes the photo circular */
  object-fit: cover; // Ensure the image covers the area
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  boder: 1px solid rgb(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000; /* Ensure it appears above other elements */
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    with: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-direction: 1s;
    }
  }
`;
