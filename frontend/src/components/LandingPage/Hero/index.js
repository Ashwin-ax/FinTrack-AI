import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Hero = () => {
  return (
    <section className="hero-container" id="home">
      <div className="hero-content">
        {/* Left Side: Text Content */}
        <div className="hero-text-section">
          <div className="badge">AI-Powered Finance</div>
          <h1 className="hero-title">
            Smart Tracking for{" "}
            <span className="text-gradient">Financial Growth</span>
          </h1>
          <p className="hero-subtitle">
            Take control of your money with our MERN-stack powered tracker. Get
            real-time insights, smart budgeting, and AI-driven advice to reach
            your goals faster.
          </p>
          <div className="hero-cta-group">
            <Link to="/register" className="btn-primary-lg">
              Start for Free
            </Link>
            <button className="btn-secondary-lg">Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">10k+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">99%</span>
              <span className="stat-label">Security</span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Element */}
        <div className="hero-visual-section">
          <div className="main-card-mockup">
            <div className="mockup-header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="mockup-body">
              <div className="floating-card lp-income">
                <span>Income</span>
                <p>+₹45,240.00</p>
              </div>
              <div className="floating-card expenses">
                <span>Expenses</span>
                <p>-₹2,120.50</p>
              </div>
              <div className="ai-insight-bubble">
                <span className="sparkle">✨</span>
                <p>Gemini: "You saved 15% more this month!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
