import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import "./index.css";

const CTASection = () => {
  return (
    <section className="cta-container">
      <div className="cta-card">
        <div className="cta-content">
          <h2 className="cta-heading">
            Ready to transform your financial life?
          </h2>
          <p className="cta-text">
            Join thousands of users who are already using FinTrackAI to manage
            their budgets, track investments, and grow their wealth with Gemini
            AI.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-cta-white">
              Get Started for Free <HiArrowRight className="icon-arrow" />
            </Link>
            <button className="btn-cta-outline">Contact Sales</button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="cta-circle circle-1"></div>
        <div className="cta-circle circle-2"></div>
      </div>
    </section>
  );
};

export default CTASection;
