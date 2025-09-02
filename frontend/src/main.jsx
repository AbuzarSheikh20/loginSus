import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import "./index.css";
import Home from "./Home";
import ChooseLogin from "./ChooseLogin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<App />} />
      <Route path="/choose" element={<ChooseLogin />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
