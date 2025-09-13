// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HODLogin from "./HodLogin.jsx";
import UserLogin from "./UserLogin.js";
import HodDashboard from "./HodDashboard.js";
import UserDashboard from "./UserDashboard.js"; // <-- Replace with your medical application page

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Pages */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/hod-login" element={<HODLogin />} />

        {/* After login */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/hod-dashboard" element={<HodDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
