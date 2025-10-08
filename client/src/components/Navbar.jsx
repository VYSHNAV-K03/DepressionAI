import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
      style={{ backgroundColor: "#2C3E50" }}
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-4 text-uppercase" to="/">
          <span style={{ color: "#00B894" }}>Depression</span>
          <span style={{ color: "#fff" }}>AI</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item mx-2">
              <Link className="nav-link text-light fw-semibold" to="/">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {user?.role === "admin" && (
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link text-light fw-semibold"
                      to="/admin"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                {user?.role === "patient" && (
                  <>
                    <li className="nav-item mx-2">
                      <Link
                        className="nav-link text-light fw-semibold"
                        to="/patient"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link
                        className="nav-link text-light fw-semibold"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item mx-2">
                  <button
                    className="btn btn-outline-light px-3 py-1 rounded-pill fw-semibold"
                    onClick={handleLogout}
                    style={{
                      transition: "0.3s",
                      borderColor: "#00B894",
                      color: "#00B894",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#00B894";
                      e.target.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#00B894";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-outline-light rounded-pill px-3 py-1"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="btn rounded-pill px-3 py-1"
                    style={{
                      backgroundColor: "#00B894",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
