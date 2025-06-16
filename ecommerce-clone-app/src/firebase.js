// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChK4bfL6UP8CXm-2TvxTlvQetULpHY4zM",
  authDomain: "clone-56b03.firebaseapp.com",
  projectId: "clone-56b03",
  storageBucket: "clone-56b03.appspot.com",
  messagingSenderId: "250040535829",
  appId: "1:250040535829:web:1e741e6cb883fde5c0771c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
