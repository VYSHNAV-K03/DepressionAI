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

const StudentProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [predictionResult, setPredictionResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null); // 👈 new state
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

  // 🧠 Predict Depression
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

      setPredictionResult(response.data.prediction);
      setFeatureImportance(response.data.feature_importance);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictionResult("Error in prediction");
    } finally {
      setLoadingPrediction(false);
    }
  };

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  // Generate circular avatar with initials
  const generateAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return (
      <div
        className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-auto shadow"
        style={{ width: "120px", height: "120px", fontSize: "40px" }}
      >
        {initials}
      </div>
    );
  };

  // Prepare data for bar chart
  const chartData =
    featureImportance &&
    Object.entries(featureImportance).map(([key, value]) => ({
      name: key.replace(/_/g, " "), // prettify labels
      value: value,
    }));

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Student Profile</h3>
      <div className="card shadow-lg p-4 rounded-4">
        {generateAvatar(user.userId.username)}

        <ul className="nav nav-tabs mt-4 mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "basic" ? "active" : ""}`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "mental" ? "active" : ""}`}
              onClick={() => setActiveTab("mental")}
            >
              Mental Health
            </button>
          </li>
        </ul>

        {activeTab === "basic" && (
          <div className="text-center">
            <h5 className="fw-bold mb-2">Name: {user.userId.username}</h5>
            <p className="text-muted mb-1">Phone: {user.userId.phone}</p>
            <p className="text-muted mb-1">Email: {user.userId.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Course: {user.course}</p>
            <p>Year: {user.year}</p>
          </div>
        )}

        {activeTab === "mental" && (
          <div className="mt-3">
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Course: {user.course}</p>
            <p>Year: {user.year}</p>
            <p>CGPA: {user.cgpa}</p>
            <p>Marital Status: {user.marital}</p>
            <p>Anxiety: {user.anxiety ? "Yes" : "No"}</p>
            <p>Panic: {user.panic ? "Yes" : "No"}</p>
            <p>Treatment: {user.treatment ? "Yes" : "No"}</p>

            <button
              className="btn btn-primary mt-3"
              onClick={predictDepression}
              disabled={loadingPrediction}
            >
              {loadingPrediction ? "Predicting..." : "Predict Depression"}
            </button>

            {predictionResult && (
              <div className="alert alert-info mt-3 text-center">
                <strong>Prediction:</strong> {predictionResult}
              </div>
            )}

            {/* 🎯 SHAP Explanation Chart */}
            {featureImportance && (
              <div className="mt-4">
                <h5 className="text-center">Factors Affecting Depression</h5>
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
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>

                <p className="text-muted small text-center">
                  Positive values ↑ increase depression risk, Negative values ↓
                  decrease it
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
