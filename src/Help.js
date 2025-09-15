import React, { useState } from "react";
import "./Help.css";

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      {/* Header */}
      <div className="help-header">
        <h1>Help & Support</h1>
        <p>
          Find answers to common questions and learn how to use the system
        </p>
      </div>

      {/* Content Grid */}
      <div className="help-grid">
        {/* How to use the system */}
        <div className="help-card">
          <h2>How to Use the System</h2>
          <ul>
            <li>Go to the approval form page.</li>
            <li>Enter your details and request approval.</li>
            <li>Submit the request and wait for HOD approval.</li>
            <li>Check the status of your request anytime.</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="help-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            {[
              {
                q: "What happens if my approval request is rejected?",
                a: "You will receive a notification with reasons. You can resubmit the request after corrections."
              },
              {
                q: "Can I edit my request after submission?",
                a: "No, but you can cancel and create a new request."
              },
              {
                q: "Who can access this system?",
                a: "Students and HODs with valid login credentials."
              }
            ].map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.q} {activeIndex === index ? "−" : "+"}
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="help-card contact-card">
        <h2>Contact Support</h2>
        <p>
          Need more help? Reach out to us at{" "}
          <a href="mailto:24ce014@charusat.edu.in">
            24ce014@charusat.edu.in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Help;