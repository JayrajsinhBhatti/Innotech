import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./HodDashboard.css";
import charusatLogo from "./charusat-logo.png";
import pagelogo from "./charusat-page-logo.png";

export default function HodDashboard() {

  const [student, setStudent] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success"); // success | error
  const navigate = useNavigate();

  const SESSION_DURATION = 0.15 * 60 * 1000; // 15 minutes

  // Load HOD username & student data
  useEffect(() => {
    document.title = "HOD Dashboard";
    
    const savedUser = localStorage.getItem("hodUsername");
    if (!savedUser) {
      navigate("/hod-login", { replace: true });
      return;
    }

    setUsername(savedUser);

    // Show login success only once
    const loggedInFlag = sessionStorage.getItem("hodLoggedInFlag");
    if (!loggedInFlag) {
      showNotification("Logged in successfully!", "success");
      sessionStorage.setItem("hodLoggedInFlag", "true");
    }

    // Load pending student application
    const savedApplication = JSON.parse(localStorage.getItem("medicalApplication"));
    if (savedApplication) setStudent(savedApplication);

    // Disable back button
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

  // Auto session expiration
const sessionTimer = setTimeout(() => {
  // Step 1: Show session expired
  showNotification("Session expired ❌", "error");

  // Step 2: After 3 seconds (when it disappears), logout + show success
  setTimeout(() => {
    localStorage.removeItem("hodUsername");
    sessionStorage.removeItem("hodLoggedInFlag");
    setUsername("");

    // Show "Logged out successfully" now
    showNotification("Logged out successfully!", "success");

    // Step 3: After another 2s, redirect to login
    setTimeout(() => {
      navigate("/hod-login", { replace: true });
    }, 2000);

  }, 3000); // matches your showNotification auto-clear timing
}, SESSION_DURATION);



    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearTimeout(sessionTimer);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("hodUsername");
    sessionStorage.removeItem("hodLoggedInFlag");
    setUsername("");
    showNotification("Logged out successfully!", "success");
    setTimeout(() => navigate("/hod-login", { replace: true }), 2000);
  };

  const handleApprove = async () => {
    if (!student) return;

    const templateParams = {
      student_name: student.studentName,
      student_email: student.studentEmail,
      student_id: student.studentId,
      health_issue: student.healthProblem,
      counsellor_name: student.counsellorName,
      date_of_application: student.date,
      approval_status: "Approved ✅",
    };

    try {
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_ppla02l",
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("✅ Approval email sent:", response.text);
      showNotification(`Student ID ${student.studentId} approved & email sent.`, "success");

      localStorage.removeItem("medicalApplication");
      setStudent(null);
    } catch (error) {
      console.error("❌ Failed to send approval email:", error);
      showNotification("Request approved, but email not sent.", "error");
      localStorage.removeItem("medicalApplication");
      setStudent(null);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotificationType(type);
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="page-container">
      {notification && (
        <div className={`notification-popup ${notificationType}`}>
          <span className="tick-mark">{notificationType === "success" ? "✔" : "❌"}</span>
          <span className="notification-text">{notification}</span>
        </div>
      )}

      <div className="page-title-container">
        <img src={charusatLogo} alt="CHARUSAT Logo" className="charusat-logo" />
        <h1 className="page-title">CHARUSAT Medical Approval</h1>
      </div>

      <div className="welcome-box">
        <h2 className="welcome-text">Welcome, {username || "HOD"} </h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="approval-card">
        <h2 className="title">HOD Approval</h2>
        {student ? (
          <>
            <div className="info">
              <p><span>Student ID:</span> {student.studentId}</p>
              <p><span>Name:</span> {student.studentName}</p>
              <p><span>Health Problem:</span> {student.healthProblem}</p>
              <p><span>Counsellor:</span> {student.counsellorName}</p>
              <p><span>Date:</span> {student.date}</p>
              <p><span>Email:</span> {student.studentEmail}</p>
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
