import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import CheckOut from "./components/CheckOut";

import Navbar from "./components/Navbar";

export default function App() {

return (

  <Router>
    <Navbar />
    <Sidebar />
    <CheckOut />
  </Router>

);

}