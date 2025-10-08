import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const StudentProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [predictionResult, setPredictionResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}api/patient/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const predictDepression = async () => {
    setLoadingPrediction(true);
    setPredictionResult(null);
    setFeatureImportance(null);

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        Age: user.age,
        Choose_your_gender: user.gender,
        What_is_your_course: user.course,
        Your_current_year_of_Study: user.year,
        What_is_your_CGPA: user.cgpa,
        Marital_status: user.marital,
        Do_you_have_Anxiety: user.anxiety ? "Yes" : "No",
        Do_you_have_Panic_attack: user.panic ? "Yes" : "No",
        Did_you_seek_any_specialist_for_a_treatment: user.treatment
          ? "Yes"
          : "No",
      });

      const prediction = response.data.prediction;
      const feature_importance = response.data.feature_importance;

      await axios.put(`${apiUrl}api/counsellor/predict/${user._id}`, {
        predictionResult: prediction,
        featureImportance: feature_importance,
      });

      setPredictionResult(prediction);
      setFeatureImportance(feature_importance);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictionResult("Error in prediction");
    } finally {
      setLoadingPrediction(false);
    }
  };

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
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className="text-center fw-bold py-4 text-primary">
        <i className="bi bi-person-circle me-2"></i>Student Profile
      </h3>

      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{
          background: "white",
          borderRadius: "20px",
          transition: "all 0.3s ease",
        }}
      >
        {generateAvatar(user.userId.username)}

        {/* Tabs */}
        <ul className="nav nav-pills justify-content-center gap-2 mt-4 mb-3">
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 ${
                activeTab === "basic" ? "active" : ""
              }`}
              style={{
                borderRadius: "25px",
                fontWeight: "500",
                background:
                  activeTab === "basic"
                    ? "linear-gradient(90deg, #6f42c1, #007bff)"
                    : "#f0f2ff",
                color: activeTab === "basic" ? "white" : "#6f42c1",
                transition: "all 0.3s ease",
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
                borderRadius: "25px",
                fontWeight: "500",
                background:
                  activeTab === "mental"
                    ? "linear-gradient(90deg, #6f42c1, #007bff)"
                    : "#f0f2ff",
                color: activeTab === "mental" ? "white" : "#6f42c1",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActiveTab("mental")}
            >
              <i className="bi bi-brain me-1"></i> Mental Health
            </button>
          </li>
        </ul>

        {/* --- Basic Info Section --- */}
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
              {[
                ["Age", user.age],
                ["Gender", user.gender],
                ["Course", user.course],
                ["Year", user.year],
              ].map(([label, value], i) => (
                <div key={i} className="col-md-4 mb-3">
                  <div
                    className="p-3 rounded shadow-sm"
                    style={{
                      background: "#f8f9ff",
                      color: "#333",
                      fontWeight: "500",
                    }}
                  >
                    <strong>{label}:</strong> {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Mental Health Section --- */}
        {activeTab === "mental" && (
          <div className="mt-4">
            <div className="row gy-2">
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

            <div className="text-center mt-4">
              <button
                className="btn px-4 py-2"
                style={{
                  background: "linear-gradient(90deg, #6f42c1, #007bff)",
                  color: "white",
                  borderRadius: "30px",
                  fontWeight: "500",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.boxShadow = "0 6px 18px rgba(0,0,0,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)")
                }
                onClick={predictDepression}
                disabled={loadingPrediction}
              >
                {loadingPrediction ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Predicting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-activity me-2"></i> Predict Depression
                  </>
                )}
              </button>
            </div>

            {predictionResult && (
              <div
                className="alert alert-info mt-4 text-center shadow-sm rounded-3"
                style={{
                  background: "#f0f4ff",
                  color: "#0056b3",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                <i className="bi bi-bar-chart-line-fill me-2"></i>
                <strong>Prediction:</strong> {predictionResult}
              </div>
            )}

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

export default StudentProfile;
