
import './App.css';
// import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotpassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
