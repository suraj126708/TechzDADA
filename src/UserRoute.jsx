/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./pages/HomePage";
import CollegeInfo from "./pages/CollegeInfo";
import ContactUs from "./pages/ContactUs";
import GetColleges from "./pages/GetColleges";

function UserRoute() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/college/:name" element={<CollegeInfo />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Get-colleges" element={<GetColleges />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserRoute;
