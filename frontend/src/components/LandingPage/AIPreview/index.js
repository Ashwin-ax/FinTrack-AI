import React from "react";
import { HiSparkles, HiLightBulb, HiTrendingUp } from "react-icons/hi";
import "./index.css";

const AIPreview = () => {
  return (
    <section className="ai-container" id="aicoach">
      <div className="ai-wrapper">
        {/* Visual Showcase (The Mock AI Chat) */}
        <div className="ai-visual">
          <div className="ai-chat-window">
            <div className="chat-header">
              <div className="ai-status">
                <span className="status-dot"></span>
                Gemini AI Advisor
              </div>
            </div>
            <div className="chat-body">
              <div className="chat-message user">
                "Analyze my food spending this month."
              </div>
              <div className="chat-message ai">
                <div className="ai-typing">
                  <span className="sparkle-icon">
                    <HiSparkles />
                  </span>
                  <p>
                    Based on your data, you've spent 22% more on dining out than
                    last month. I suggest a <strong>$50 budget cap</strong> for
                    next week to stay on track for your savings goal.
                  </p>
                </div>
              </div>
            </div>
            <div className="ai-metrics">
              <div className="metric-tag">
                <HiTrendingUp /> Savings Potential: +15%
              </div>
              <div className="metric-tag">
                <HiLightBulb /> Tip: Reduce Subscriptions
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="ai-text-content">
          <div className="ai-badge">Powered by Google Gemini</div>
          <h2 className="ai-title">
            Your Personal{" "}
            <span className="text-highlight">AI Financial Coach</span>
          </h2>
          <p className="ai-description">
            Stop guessing and start growing. Our integrated AI analyzes your
            MongoDB transaction data to provide hyper-personalized advice.
          </p>
          <ul className="ai-feature-list">
            <li>
              <strong>Predictive Alerts:</strong> Know when you're likely to
              overspend before it happens.
            </li>
            <li>
              <strong>Smart Categorization:</strong> Automatically group
              transactions with high accuracy.
            </li>
            <li>
              <strong>Natural Language Queries:</strong> Ask your finance
              tracker questions just like you're talking to a friend.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIPreview;
