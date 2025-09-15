// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HODLogin from "./HodLogin.jsx";
import UserLogin from "./UserLogin.js";
import HodDashboard from "./HodDashboard.js";
import UserDashboard from "./UserDashboard.js"; // <-- Replace with your medical application page
import AboutUs from "./AboutUs.js"; // New page
import Help from "./Help.js";       // New page

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

        {/* Other pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
