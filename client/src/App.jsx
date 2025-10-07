import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorRegisterPage from "./pages/CounsellorRegisterPage";
import AdminPanel from "./pages/Admin";
import Profile from "./pages/Profile";
import Patient from "./pages/Patient";
import Counsellor from "./pages/Counsellor";
import StudentProfile from "./pages/StudentProfile";

const App = () => {
  return (
    <Router>
      <div className="bg-custom vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-doctor" element={<DoctorRegisterPage />} />
          <Route path="/counsellor" element={<Counsellor />} />
          <Route path="/student/:id" element={<StudentProfile />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
