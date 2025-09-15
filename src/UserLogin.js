import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  

  // Demo credentials
  const validUsername = "24CE014";
  const validPassword = "123";

  useEffect(() => {
    document.title = "User Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setError("");

      // Save both username and studentId
      localStorage.setItem("username", username);
      localStorage.setItem("studentId", username); 

      // Redirect after saving
      navigate("/user-dashboard", { replace: true });

      // Reset form
      setUsername("");
      setPassword("");
    } else {
      setError("❌ Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="charusat-logo.png"
          alt="CHARUSAT Logo"
          className="logo"
        />
        <h2 className="title">User Login</h2> {}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
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
        <a href="/about" className="footer-link"> About </a> |
        <a href="/help" className="footer-link help"> Help </a>
      </footer>
    </div>
  );
}
