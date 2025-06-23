import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";

/**
 * The main entry point of the application.
 *
 * @component
 *
 * The App component sets up the routing for the entire application using React Router.
 * It includes the Header component that is displayed on all pages and it also defines routes
 * for the Login, Home, and Detail pages. Each route renders a corresponding component
 * based on the URL path. This component ensures the app's structure and navigation.
 */

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
