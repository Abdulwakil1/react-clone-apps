/**
 * Login.jsx is concerned with the specific user actions (login/register) and immediate feedback.
 * Login.jsx handles immediate authentication and updates the global state when the user logs in or registers.
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import "../Login.css";

function Login() {
  const [{ contactInfo, password, name, reEnterPassword, address }, dispatch] =
    useStateValue();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUT_VALUE",
      name,
      value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        contactInfo,
        password
      );
      // console.log("Logged in user:", userCredential.user);
      dispatch({
        type: "SET_USER",
        user: userCredential.user,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      alert(error.message);
    }
  };

  const register = async (event) => {
    event.preventDefault();

    if (password !== reEnterPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        contactInfo,
        password
      );
      // console.log("User created:", userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        contactInfo: contactInfo,
        address: address, // address field
      });

      dispatch({
        type: "SET_USER",
        user: userCredential.user,
        address: address,
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login__container">
        <h1>{isRegistering ? "Create account" : "Sign In"}</h1>
        <form>
          {isRegistering && (
            <>
              <h5>Your name</h5>
              <input
                name="name"
                value={name}
                onChange={handleInputChange}
                type="text"
                placeholder="First and last name"
              />
            </>
          )}

          <h5>Email or mobile phone number</h5>
          <input
            name="contactInfo"
            value={contactInfo}
            onChange={handleInputChange}
            type="text"
          />

          {isRegistering && (
            <>
              <h5>Address</h5>
              <input
                name="address"
                value={address}
                onChange={handleInputChange}
                type="text"
              />
            </>
          )}

          <h5>Password</h5>
          <input
            name="password"
            value={password}
            onChange={handleInputChange}
            type="password"
            placeholder="At least 6 characters"
          />
          <p className="login__feedback">
            Passwords must be at least 6 characters.
          </p>

          {isRegistering && (
            <>
              <h5>Re-enter password</h5>
              <input
                name="reEnterPassword"
                value={reEnterPassword}
                onChange={handleInputChange}
                type="password"
              />
            </>
          )}

          {!isRegistering ? (
            <button
              type="submit"
              onClick={login}
              className="login__signInButton"
            >
              Sign In
            </button>
          ) : (
            <button onClick={register} className="login__signInButton">
              Create your Amazon Account
            </button>
          )}
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        {!isRegistering && (
          <div className="login__newUserMessage">
            <hr className="login__hrLeft" />
            <p className="login__text">New to Amazon?</p>
            <hr className="login__hrRight" />
          </div>
        )}

        {!isRegistering && (
          <button
            onClick={() => setIsRegistering(true)}
            className="login__registerButton"
          >
            Create your Amazon Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
