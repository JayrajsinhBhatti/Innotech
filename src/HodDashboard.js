import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // ✅ Import EmailJS
import "./HodDashboard.css";
import charusatLogo from "./charusat-logo.png";

export default function HodDashboard() {
  const [student, setStudent] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(); // Optional: for EmailJS if using sendForm

  // Protect route & load student data
  useEffect(() => {
    const savedUser = localStorage.getItem("hodUsername");
    if (!savedUser) {
      navigate("/hod-login", { replace: true });
    } else {
      setUsername(savedUser);
      showNotification("Logged in successfully!");

      // Load pending application from localStorage
      const savedApplication = JSON.parse(localStorage.getItem("medicalApplication"));
      if (savedApplication) setStudent(savedApplication);

      // Disable back button
      window.history.pushState(null, "", window.location.href);
      const handlePopState = () => window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("hodUsername");
    setUsername("");
    showNotification("Logged out successfully!");
    setTimeout(() => navigate("/hod-login", { replace: true }), 2000);
  };

  const handleApprove = async () => {
    if (student) {
      // Send approval email to the student
      const templateParams = {
        student_name: student.studentName || student.username,
        student_id: student.studentId,
        health_issue: student.healthProblem,
        counsellor_name: student.counsellorName,
        date_of_application: student.date,
        approval_status: "Approved ✅",
      };

      try {
        const response = await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        console.log("✅ Approval email sent:", response.text);
        showNotification(`Request for Student ID ${student.studentId} approved and email sent.`);

        // Clear application
        localStorage.removeItem("medicalApplication");
        setStudent(null);
      } catch (error) {
        console.error("❌ Failed to send approval email:", error);
        showNotification(`Request approved, but email not sent.`);
        localStorage.removeItem("medicalApplication");
        setStudent(null);
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
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
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
                Approve & Send Email
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
