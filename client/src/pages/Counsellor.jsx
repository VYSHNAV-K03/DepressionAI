import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Counsellor = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(apiUrl + "api/patient/get");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const generateAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return (
      <div className="d-flex justify-content-center mt-3">
        <div
          className="text-white rounded-circle d-flex justify-content-center align-items-center shadow-lg"
          style={{
            width: "90px",
            height: "90px",
            fontSize: "30px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #00B894, #2C3E50)",
          }}
        >
          {initials}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(180deg, #F8F9FF, #EEF2FF)",
      }}
    >
      <div className="container">
        <h2
          className="text-center fw-bold mb-5"
          style={{ color: "#2C3E50", textTransform: "uppercase" }}
        >
          <i
            className="bi bi-people-fill me-2"
            style={{ color: "#00B894" }}
          ></i>
          All Students
        </h2>

        <div className="row g-4">
          {users.map((user) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={user._id}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 transition-all"
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0,0,0,0.1)";
                }}
                onClick={() => navigate(`/student/${user._id}`)}
              >
                {/* Avatar */}
                {generateAvatar(user.username)}

                {/* Body */}
                <div className="card-body text-center">
                  <h5
                    className="fw-bold mb-1"
                    style={{ color: "#2C3E50", letterSpacing: "0.5px" }}
                  >
                    {user.username}
                  </h5>
                  <p className="text-muted mb-2">
                    <i className="bi bi-telephone-fill text-success me-2"></i>
                    {user.phone}
                  </p>
                </div>

                {/* Footer Button */}
                <div className="card-footer bg-transparent border-0 text-center pb-4">
                  <button
                    className="btn px-4 py-1 rounded-pill fw-semibold"
                    style={{
                      backgroundColor: "#00B894",
                      color: "#fff",
                      border: "none",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#009E80";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#00B894";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/${user._id}`);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center text-muted mt-5">
              <i className="bi bi-hourglass-split me-2 text-primary"></i>
              No students found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counsellor;
