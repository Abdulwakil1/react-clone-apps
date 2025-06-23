# React + Vite

Streaming Clone App
A full-stack, Disney-inspired streaming web app built with React, Firebase, and Redux.

🛠 Tech Stack
React.js – Front-end library for building the user interface

React Router v6 – Client-side routing

Redux Toolkit – Global state management

Firebase Authentication – User login/sign-out

Firebase Firestore – Real-time backend database

Styled Components – Modular, scoped component styling

React Slick – Carousel for promotional sliders

Vite – Front-end build tool for fast development

⚙️ Features
🔐 Authentication

Login and logout using Firebase’s Google sign-in

Conditional routing based on authentication state

🏠 Home Dashboard

Shows personalized categories: Recommended, New to Disney+, Originals, Trending

Auto-updates with real-time Firestore data

🎥 Movie Details Page

Detailed view with background image, title, description, and metadata

Interactive UI: Play, Trailer, Add to List, Group Watch, Like, Dislike, Share, Download

🖼️ Dynamic Image Slider

Slick-based image carousel on the homepage

📺 Content Previews

Section of branded categories (Disney, Pixar, Marvel, Star Wars, National Geographic) with video previews on hover

📱 Responsive Design

Optimized layout for various screen sizes

🔐 Authentication Flow
Users are redirected to the /login route if unauthenticated

Upon successful sign-in, users are redirected to /home

Access to /home and /detail/:id is restricted to authenticated users

📌 Disclaimer
This project is for educational purposes only.
It is not affiliated with, endorsed by, or connected to Disney+, Disney Plus, or The Walt Disney Company in any way.
All images, logos, and trademarks remain the property of their respective owners and are used here strictly for learning and demonstration.

🎯 Educational Purpose
This streaming clone app was developed to deepen my understanding of:

Authenticated routing in React

Real-time data fetching with Firebase

Scalable state management using Redux Toolkit

Component-based UI styling with Styled Components

Real-world app structure and design patterns

It is part of a broader journey into modern web development, UI/UX, and cloud-based full-stack applications.

## 📘 Appendix: Redux Terminology

# Redux Terminology Guide

This guide provides definitions for key terms used in Redux and Redux Toolkit, to help you understand and implement state management in your applications.

### Slice

A slice is a portion of the Redux state and the logic to update that portion. It is created using the `createSlice` function from Redux Toolkit. The term "slice" refers to the fact that it represents a slice of the overall application state.

### Reducer

A reducer is a function that takes the current state and an action as arguments and returns a new state. It "reduces" the action and current state down to a new state. The term comes from the concept of reducing a collection to a single value through a series of operations, similar to the reduce function in array processing.

### Dispatch

To dispatch an action means to send it to the Redux store, triggering the corresponding reducer to update the state. The term "dispatch" is used because it sends or "dispatches" the action through the store's reducers.

### Action

An action is an object that describes a change to be made to the state. It typically has a `type` property (indicating the type of action) and a `payload` property (containing any necessary data). The term "action" is used because it represents an action or event that changes the state.

### Selector

## A selector is a function that extracts a specific part of the state from the Redux store. The term "selector" is used because it "selects" a portion of the state to be used in a component.

These terms are part of the Redux architecture, which organizes state management into a predictable flow, helping to manage complex state changes in a clear and consistent manner

By understanding these key terms, you will be better equipped to work with Redux and Redux Toolkit, enabling you to manage state effectively in your applications.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
