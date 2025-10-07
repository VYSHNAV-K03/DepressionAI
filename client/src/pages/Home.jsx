import React, { useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/img.jpg";

const Home = () => {
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get("http://localhost:7000");
        console.log(response.data); // Should output 'Server is running'
      } catch (error) {
        console.error("Error connecting to server:", error);
      }
    };

    checkServer();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        height: "92vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // dark layer for visibility
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
        <h1 className="display-4 fw-bold">Depression Detection AI</h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
          Welcome to the Depression Checking Application, a supportive platform
          that leverages AI technology to assess mental well-being and provide
          early insights into depression symptoms.
        </p>
      </div>
    </div>
  );
};

export default Home;
