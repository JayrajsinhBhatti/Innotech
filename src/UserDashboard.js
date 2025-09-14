import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [formData, setFormData] = useState({
    healthProblem: "",
    counsellorName: "",
    date: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState(""); 
  const [username, setUsername] = useState("");
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedStudentId = localStorage.getItem("studentId"); // get studentId
    if (!savedUser || !savedStudentId) {
      navigate("/", { replace: true });
    } else {
      setUsername(savedUser);
      setStudentId(savedStudentId); // store studentId
      showNotification("Logged in successfully!");
    }

    // Disable back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine form data with studentId
    const dataToSend = { studentId, ...formData };

    // Save data to localStorage temporarily for HOD dashboard
    localStorage.setItem("medicalApplication", JSON.stringify(dataToSend));

    setShowDialog(true);
    setFormData({
      healthProblem: "",
      counsellorName: "",
      date: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("studentId"); // also remove studentId
    setUsername("");
    showNotification("Logged out successfully!");
    setTimeout(() => navigate("/", { replace: true }), 2000);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="page-container">
      {notification && (
        <div className="notification-popup">
          <span className="tick-mark">✔</span>
          <span className="notification-text">{notification}</span>
        </div>
      )}

      <div className="main-content">
        <div className="page-title-container">
          <img src="./charusat-logo.png" alt="Charusat Logo" className="charusat-logo" />
          <h1 className="page-title">CHARUSAT Medical Approval</h1>
        </div>

        <div className="welcome-box">
          <div className="welcome-content">
            <h2>Welcome, {username || "Student"} </h2>
            <p>Fill out the form below to submit your medical application.</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="approval-card">
          <h2 className="title">Medical Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Health Problem</label>
              <input
                type="text"
                name="healthProblem"
                value={formData.healthProblem}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Counsellor Name</label>
              <input
                type="text"
                name="counsellorName"
                value={formData.counsellorName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Application</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="button-container">
              <button type="submit" className="approve-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>✅ Application Submitted</h3>
            <p>Your request has been sent for HOD approval.</p>
            <p>You will receive an e-mail once approved.</p>
            <button onClick={() => setShowDialog(false)} className="approve-btn">Close</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          © Copyright CSPIT – CHARUSAT | All rights reserved |
          <a href="/about" className="footer-link">About</a> |{" "}
          <a href="/help" className="footer-link help">Help</a>
        </p>
      </footer>
    </div>
  );
}
