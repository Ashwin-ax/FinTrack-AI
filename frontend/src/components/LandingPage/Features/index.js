import React from "react";
import {
  HiChartBar,
  HiShieldCheck,
  HiLightningBolt,
  HiChip,
} from "react-icons/hi";
import "./index.css";

const Features = () => {
  const featureData = [
    {
      icon: <HiChartBar />,
      title: "Visual Analytics",
      desc: "Transform raw numbers into beautiful, easy-to-read charts and graphs. Track your spending trends at a glance.",
    },
    {
      icon: <HiChip />,
      title: "AI Insights",
      desc: "Powered by Gemini API. Get personalized financial advice and alerts based on your unique spending habits.",
    },
    {
      icon: <HiLightningBolt />,
      title: "Real-time Tracking",
      desc: "Experience lightning-fast updates. Your transactions are synced instantly across all devices using MongoDB.",
    },
    {
      icon: <HiShieldCheck />,
      title: "Secure & Private",
      desc: "Your data is encrypted and protected with industry-standard JWT authentication and secure database protocols.",
    },
  ];

  return (
    <section className="features-container" id="features">
      <div className="features-wrapper">
        <div className="features-header">
          <h2 className="features-subtitle">Powerful Features</h2>
          <h1 className="features-title">
            Everything you need to{" "}
            <span className="text-highlight">master your money</span>
          </h1>
          <p className="features-description">
            We’ve combined modern web technology with advanced AI to give you
            the ultimate financial edge.
          </p>
        </div>

        <div className="features-grid">
          {featureData.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-box">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-text">{feature.desc}</p>
              <div className="feature-card-border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
