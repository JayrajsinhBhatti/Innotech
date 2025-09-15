import React from "react";
import "./AboutUs.css";

function About() {
  const team = [
    { name: "Jayrajsinh Bhatti", role: "Frontend Developer", id: "24CE014" },
    { name: "Kavya Chauhan", role: "Frontend Developer", id: "24CE017" },
    { name: "Nishra Gajkandh", role: "Backend Developer", id: "24CE031" },
    { name: "Nishtha Patel", role: "Backend Developer", id: "24CE090" },
  ];

  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header">
        <h1 className="about-title">Skill Team</h1>
        <p className="about-subtitle">
          "Meet our amazing team of developers who turned an idea into reality."
        </p>
      </div>

      {/* Developer Team Section */}
      <h2 className="section-title">Developer Team</h2>
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="team-card" key={index}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <span>{member.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;