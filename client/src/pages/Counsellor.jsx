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
          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center shadow"
          style={{
            width: "80px",
            height: "80px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {initials}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center fw-bold text-primary">All Students</h2>
      <div className="row g-4">
        {users.map((user) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={user._id}>
            <div
              className="card h-100 border-0 shadow-lg rounded-4 hover-shadow transition"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/student/${user._id}`)}
            >
              {/* Avatar */}
              {generateAvatar(user.username)}

              {/* Body */}
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">
                  {user.username}
                </h5>
                <p className="card-text text-muted">📞 {user.phone}</p>
              </div>

              {/* Button */}
              <div className="card-footer bg-white border-0 text-center pb-3">
                <button
                  className="btn btn-outline-primary btn-sm px-4 rounded-pill"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    navigate(`/student/${user._id}`);
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counsellor;
