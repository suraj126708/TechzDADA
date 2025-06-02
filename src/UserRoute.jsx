/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./pages/HomePage";
import CollegeInfo from "./pages/CollegeInfo";
import ContactUs from "./pages/ContactUs";

function UserRoute() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/college/:name" element={<CollegeInfo />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserRoute;
