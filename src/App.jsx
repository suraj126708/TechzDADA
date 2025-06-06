/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import UserRoute from "./UserRoute";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoute />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <ToastContainer />
    </div>
  );
}

export default App;
