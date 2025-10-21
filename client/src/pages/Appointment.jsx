import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Appointment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this to backend using axios here
    console.log("Appointment booked:", form);

    setSubmitted(true);

    // Optionally reset the form
    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });

    // Redirect or show message after a delay
    setTimeout(() => {
      setSubmitted(false);
      navigate("/myprofile");
    }, 2000);
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{
        background: "linear-gradient(180deg, #f8f9ff, #eef2ff)",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        padding: "30px",
        maxWidth: "700px",
      }}
    >
      <h3 className="text-center fw-bold mb-4 text-primary">
        <i className="bi bi-calendar-check me-2"></i>Book an Appointment
      </h3>

      {submitted ? (
        <div className="alert alert-success text-center shadow-sm">
          <i className="bi bi-check-circle-fill me-2"></i>
          Appointment booked successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Message (Optional)</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Any special request or concern..."
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
            >
              <i className="bi bi-send-fill me-2"></i>Submit Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Appointment;
