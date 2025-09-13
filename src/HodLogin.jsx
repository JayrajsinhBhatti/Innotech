import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import "./App.css";

export default function HODLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ hook for redirect

  // Demo credentials (replace with backend API later)
  const validUsername = "NikitaBhatt";
  const validPassword = "123";

  const handleLogin = (e) => {
  e.preventDefault();
  if (username === validUsername && password === validPassword) {
    setError("");
    
    // Save login info for protected dashboard
    localStorage.setItem("hodUsername", username);
    
    // Redirect to HOD Dashboard
    navigate("/hod-dashboard", { replace: true });
  } else {
    setError("❌ Invalid Username or Password");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="/charusat-logo.png" // ✅ use / if image is in public folder
          alt="CHARUSAT Logo"
          className="logo"
        />
        <h2 className="title">HOD Medical Approvement Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <a href="#" className="forgot">
          Forgot password?
        </a>
      </div>

      <footer className="footer">
        © Copyright CSPIT – CHARUSAT | All rights reserved |
        <a href="/about" className="footer-link">
          About
        </a>{" "}
        |{" "}
        <a href="/help" className="footer-link help">
          Help
        </a>
      </footer>
    </div>
  );
}
