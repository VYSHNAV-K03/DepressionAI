import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Counsellor = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  console.log("users", users);

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
      <div
        className="bg-primary text-white d-flex justify-content-center align-items-center mb-3"
        style={{
          width: "100%",
          height: "50%",
          fontSize: "36px",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">All Students</h3>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-3 mb-4" key={user._id}>
            <div
              className="card shadow-lg rounded-4 d-flex flex-column transition"
              style={{ height: "400px", cursor: "pointer" }}
            >
              {/* Top half: rectangular “profile image” */}
              {generateAvatar(user.username)}

              {/* Name and phone */}
              <div className="text-center mt-3">
                <h5 className="fw-bold mb-2">Name: {user.username}</h5>
                <p className="text-muted mb-3">Phone: {user.phone}</p>
              </div>

              {/* View Profile Button at bottom */}

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(`/student/${user._id}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counsellor;
