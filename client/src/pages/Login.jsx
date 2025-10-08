import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);
      const user = response.data.user;

      if (!user.isVerified) {
        setError("User is not verified. Please verify your account first.");
        setMessage("");
        return;
      }

      setMessage(response.data.message);
      setError("");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "counsellor") {
        navigate("/counsellor");
      } else {
        navigate("/patient");
      }
      location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white"
      style={{
        backgroundImage: "url('/images/login.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card bg-light bg-opacity-75 shadow-lg p-4"
        style={{ width: "22rem", borderRadius: "1rem" }}
      >
        <div className="card-body">
          <h3
            className="text-center mb-4  fw-bold"
            style={{
              color: "#2C3E50", // Heading color
            }}
          >
            Welcome Back
          </h3>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              style={{
                backgroundColor: "#00B894",
                color: "#fff",
                borderRadius: "25px",
                fontWeight: "600",
                border: "none",
                padding: "8px 20px",
              }}
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">Don't have an account?</small>
            <br />
            <a
              href="/register"
              className="text-decoration-none fw-semibold"
              style={{
                color: "#2C3E50", // Heading color
              }}
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
