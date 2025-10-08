import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [featureImportance, setFeatureImportance] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // 🔹 Replace this with your actual auth method (localStorage, context, etc.)
  const loggedInuser = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  const loggedInUserId = loggedInuser ? loggedInuser.id : null;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}api/patient/${loggedInUserId}`);
        setUser(res.data);
        setFeatureImportance(res.data.featureImportance || null);
        setPredictionResult(res.data.predictionResult || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [loggedInUserId]);

  if (!user)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  const generateAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return (
      <div
        className="rounded-circle d-flex justify-content-center align-items-center mx-auto shadow-lg"
        style={{
          width: "130px",
          height: "130px",
          fontSize: "42px",
          background: "linear-gradient(135deg, #6f42c1, #007bff)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {initials}
      </div>
    );
  };

  const chartData =
    featureImportance &&
    Object.entries(featureImportance).map(([key, value]) => ({
      name: key.replace(/_/g, " "),
      value: value,
    }));

  return (
    <div
      className="container mt-5 pb-5"
      style={{
        background: "linear-gradient(180deg, #f8f9ff, #eef2ff)",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className="text-center fw-bold py-4 text-primary">
        <i className="bi bi-person-circle me-2"></i>My Profile
      </h3>

      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{ background: "white" }}
      >
        {generateAvatar(user.userId.username)}

        <ul className="nav nav-pills justify-content-center gap-2 mt-4 mb-3">
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${
                activeTab === "basic" ? "active" : ""
              }`}
              style={{
                borderRadius: "20px",
                fontWeight: "500",
              }}
              onClick={() => setActiveTab("basic")}
            >
              <i className="bi bi-info-circle me-1"></i> Basic Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${
                activeTab === "mental" ? "active" : ""
              }`}
              style={{
                borderRadius: "20px",
                fontWeight: "500",
              }}
              onClick={() => setActiveTab("mental")}
            >
              <i className="bi bi-brain me-1"></i> Mental Health
            </button>
          </li>
        </ul>

        {/* --- Basic Info --- */}
        {activeTab === "basic" && (
          <div className="text-center mt-3">
            <h5 className="fw-bold mb-2 text-dark">{user.userId.username}</h5>
            <p className="text-muted mb-1">
              <i className="bi bi-telephone me-2 text-primary"></i>
              {user.userId.phone}
            </p>
            <p className="text-muted mb-1">
              <i className="bi bi-envelope me-2 text-primary"></i>
              {user.userId.email}
            </p>
            <div className="row mt-4 justify-content-center">
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded shadow-sm">
                  <strong>Age:</strong> {user.age}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded shadow-sm">
                  <strong>Gender:</strong> {user.gender}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded shadow-sm">
                  <strong>Course:</strong> {user.course}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded shadow-sm">
                  <strong>Year:</strong> {user.year}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Mental Health --- */}
        {activeTab === "mental" && (
          <div className="mt-4">
            <div className="row gy-2">
              <div className="col-md-6">
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <strong>Course:</strong> {user.course}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Year:</strong> {user.year}
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <strong>CGPA:</strong> {user.cgpa}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Marital Status:</strong> {user.marital}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Anxiety:</strong> {user.anxiety ? "Yes" : "No"}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Panic Attack:</strong> {user.panic ? "Yes" : "No"}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Treatment:</strong> {user.treatment ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Show saved prediction */}
            {predictionResult && (
              <div
                className="alert alert-info mt-4 text-center shadow-sm rounded-3"
                style={{ fontWeight: "500", fontSize: "1.1rem" }}
              >
                <i className="bi bi-bar-chart-line-fill me-2"></i>
                <strong>Prediction:</strong> {predictionResult}
              </div>
            )}

            {/* Show feature importance chart */}
            {featureImportance && (
              <div className="mt-4">
                <h5 className="text-center text-primary fw-bold mb-3">
                  Factors Affecting Depression
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-30}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6f42c1" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-muted small text-center mt-2">
                  <i className="bi bi-arrow-up-circle text-success"></i>{" "}
                  Positive values increase depression risk |
                  <i className="bi bi-arrow-down-circle text-danger ms-2"></i>{" "}
                  Negative values decrease it
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
