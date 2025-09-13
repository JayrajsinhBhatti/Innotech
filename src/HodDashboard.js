import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HodDashboard.css";
import charusatLogo from "./charusat-logo.png";

export default function HodDashboard() {
  const [student, setStudent] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Protect route & load data
  useEffect(() => {
    const savedUser = localStorage.getItem("hodUsername");
    if (!savedUser) {
      navigate("/hod-login", { replace: true }); // redirect if not logged in
    } else {
      setUsername(savedUser);
      showNotification("Logged in successfully!");

      // Disable back button only AFTER login
      window.history.pushState(null, "", window.location.href);
      const handlePopState = () => window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

      // Cleanup
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("hodUsername");
    setUsername("");
    showNotification("Logged out successfully!");

    // Navigate to login page after 2 seconds
    setTimeout(() => {
      navigate("/hod-login", { replace: true });
    }, 2000);
  };


  const handleApprove = () => {
    if (student) {
      alert(`Request for Student ID ${student.studentId} approved ✅`);
      localStorage.removeItem("medicalApplication");
      setStudent(null);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="page-container">
      {/* Notification Popup */}
      {notification && (
        <div className="notification-popup">
          <span className="tick-mark">✔</span>
          <span className="notification-text">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-title-container">
        <img src={charusatLogo} alt="CHARUSAT Logo" className="charusat-logo" />
        <h1 className="page-title">CHARUSAT Medical Approval</h1>
      </div>

      {/* Welcome Box */}
      <div className="welcome-box">
        <h2 className="welcome-text">Welcome, {username || "HOD"} </h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Approval Section */}
      <div className="approval-card">
        <h2 className="title">HOD Approval</h2>
        {student ? (
          <>
            <div className="info">
              <p><span>Student ID:</span> {student.studentId}</p>
              <p><span>Health Problem:</span> {student.healthProblem}</p>
              <p><span>Counsellor:</span> {student.counsellorName}</p>
              <p><span>Date:</span> {student.date}</p>
            </div>
            <div className="button-container">
              <button className="approve-btn" onClick={handleApprove}>
                Approve
              </button>
            </div>
          </>
        ) : (
          <p>No pending applications.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          © Copyright CSPIT – CHARUSAT | All rights reserved |
          <a href="/about" className="footer-link"> About </a> |
          <a href="/help" className="footer-link help"> Help </a>
        </p>
      </footer>
    </div>
  );
}
