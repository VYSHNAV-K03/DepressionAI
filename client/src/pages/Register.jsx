import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password, phone } = formData;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!username) return "Username is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit phone number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    try {
      const response = await axiosInstance.post("/register/user", formData);
      setMessage(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        // background: "linear-gradient(135deg, #74b9ff, #a29bfe)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="row g-0">
          {/* Left side image */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-white rounded-start-4">
            <img
              src="/images/register.jpg"
              alt="Register Illustration"
              className="img-fluid rounded-3"
              style={{ width: "90%", objectFit: "cover" }}
            />
          </div>

          {/* Right side form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-light rounded-end-4">
            <h2
              className="fw-bold mb-4 text-center "
              style={{
                color: "#2C3E50", // Heading color
              }}
            >
              Register as a Patient
            </h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill shadow-sm"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control rounded-pill shadow-sm"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill shadow-sm py-2 mb-3"
                style={{
                  transition: "0.3s",
                  backgroundColor: "#00B894",
                  color: "#fff",
                  borderRadius: "25px",
                  fontWeight: "600",
                  border: "none",
                  padding: "8px 20px",
                }}
              >
                Register
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 rounded-pill py-2"
                onClick={() => navigate("/register-doctor")}
              >
                Register as Counsellor
              </button>

              <p className="text-center mt-4 text-muted">
                Already have an account?{" "}
                <span
                  className="fw-semibold"
                  style={{
                    color: "#2C3E50", // Heading color
                  }}
                  role="button"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
