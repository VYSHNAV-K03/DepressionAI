import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../axiosInstance";

const Patient = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    course: "",
    year: "",
    cgpa: "",
    marital: "",
    anxiety: "",
    panic: "",
    treatment: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const userId = user?.id;
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const res = await axios.post(apiUrl + "api/patient/form", {
        ...formData,
        userId,
      });

      if (res.status === 201) {
        alert("Form submitted successfully!");
        setFormData({
          age: "",
          gender: "",
          course: "",
          year: "",
          cgpa: "",
          marital: "",
          anxiety: "",
          panic: "",
          treatment: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  // Dropdown options
  const courseOptions = [
    "Engineering",
    "Islamic Education",
    "BIT",
    "Laws",
    "Mathematics",
    "Pendidikan Islam",
    "BCS",
    "Human Resources",
    "Irkhs",
    "Psychology",
    "KENMS",
    "Accounting ",
    "ENM",
    "Marine Science",
    "KOE",
    "Banking Studies",
    "Business Administration",
    "Law",
    "KIRKHS",
    "Usuluddin",
    "TAASL",
    "Engine",
    "ALA",
    "Biomedical Science",
    "Koe",
    "Kirkhs",
    "BENL",
    "Benl",
    "IT",
    "CTS",
    "Engin",
    "Econs",
    "MHSC",
    "Malcom",
    "Kop",
    "Human Sciences ",
    "Biotechnology",
    "Communication ",
    "Diploma Nursing",
    "Radiography",
    "Psychology",
    "Fiqh Fatwa ",
    "Diploma TESL",
    "Fiqh",
    "Nursing ",
  ];

  const cgpaOptions = [
    "3.50 - 4.00",
    "3.00 - 3.49",
    "2.50 - 2.99",
    "2.00 - 2.49",
    "1.00 - 1.99",
    "0 - 0.99",
  ];

  const yearOptions = [
    { label: "1st Year", value: "year 1" },
    { label: "2nd Year", value: "year 2" },
    { label: "3rd Year", value: "year 3" },
    { label: "4th Year", value: "year 4" },
    { label: "5th Year", value: "year 5" },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-3">
        <h3 className="text-center mb-4">Student Mental Health Form</h3>

        <form onSubmit={handleSubmit}>
          {/* Age */}
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>

          {/* Course */}
          <div className="mb-3">
            <label className="form-label">Course</label>
            <select
              className="form-select"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Course --</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Year of Study */}
          <div className="mb-3">
            <label className="form-label">Current Year of Study</label>
            <select
              className="form-select"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Year --</option>
              {yearOptions.map((year, index) => (
                <option key={index} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          {/* CGPA (as dropdown) */}
          <div className="mb-3">
            <label className="form-label">CGPA Range</label>
            <select
              className="form-select"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              required
            >
              <option value="">-- Select CGPA Range --</option>
              {cgpaOptions.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Marital Status */}
          <div className="mb-3">
            <label className="form-label">Marital Status</label>
            <select
              className="form-select"
              name="marital"
              value={formData.marital}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="No">Single</option>
              <option value="Yes">Married</option>
            </select>
          </div>

          {/* Anxiety */}
          <div className="mb-3">
            <label className="form-label">Do you have Anxiety?</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="anxiety"
                  value="Yes"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="anxiety"
                  value="No"
                  onChange={handleChange}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {/* Panic Attack */}
          <div className="mb-3">
            <label className="form-label">Do you have Panic Attack?</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="panic"
                  value="Yes"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="panic"
                  value="No"
                  onChange={handleChange}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="mb-4">
            <label className="form-label">
              Did you seek any specialist for treatment?
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="treatment"
                  value="Yes"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="treatment"
                  value="No"
                  onChange={handleChange}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-4"
              style={{
                backgroundColor: "#00B894",
                color: "#fff",
                borderRadius: "25px",
                fontWeight: "600",
                border: "none",
                padding: "8px 20px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Patient;
