import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorRegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post(
        "/register/counsellor",
        formData
      );
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
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="row g-0">
          {/* Left Image Section */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-white rounded-start-4">
            <img
              src="/images/register_counsellor.jpg"
              alt="Counsellor Illustration"
              className="img-fluid rounded-3"
              style={{ width: "90%", objectFit: "cover" }}
            />
          </div>

          {/* Right Form Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-light rounded-end-4">
            <h2
              className="fw-bold mb-4 text-center "
              style={{
                color: "#2C3E50", // Heading color
              }}
            >
              Register as Counsellor
            </h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control rounded-pill shadow-sm ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control rounded-pill shadow-sm ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control rounded-pill shadow-sm ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone
                </label>
                <input
                  type="text"
                  className={`form-control rounded-pill shadow-sm ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* Submit Button */}
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

              {/* Back to Patient Register */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100 rounded-pill py-2"
                onClick={() => navigate("/register")}
              >
                Register as Patient
              </button>

              {/* Login Link */}
              <p className="text-center mt-4 text-muted">
                Already registered?{" "}
                <span
                  className=" fw-semibold"
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

export default DoctorRegisterPage;
