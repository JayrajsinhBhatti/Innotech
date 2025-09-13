import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow relative">
        {/* Left: Logo + text */}
        <div className="flex items-center">
          <img
            src="https://charusat.ac.in/images/logo.png" // replace with your logo path
            alt="CHARUSAT Logo"
            className="h-10 mr-3"
          />
          <span className="font-bold text-lg">CHARUSAT</span>
        </div>

        {/* Center: Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          CHARUSAT Medical Approval
        </h1>
      </header>

      {/* Card Section */}
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            HOD Approval
          </h2>

          <p className="text-left mb-2">
            <span className="font-semibold">Student ID:</span> 24CE017
          </p>
          <p className="text-left mb-2">
            <span className="font-semibold">Health Problem:</span> Fever and Cold
          </p>
          <p className="text-left mb-2">
            <span className="font-semibold">Counsellor:</span> Deep Kothadiya
          </p>
          <p className="text-left mb-6">
            <span className="font-semibold">Date:</span> 13/09/2025
          </p>

          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
