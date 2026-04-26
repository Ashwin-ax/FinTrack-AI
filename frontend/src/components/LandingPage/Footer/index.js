import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">●</span>
              <span className="logo-text">
                FinTrack<span className="text-highlight">AI</span>
              </span>
            </div>
            <p className="brand-desc">
              Empowering your financial journey with MERN stack technology and
              Gemini AI insights.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-grid">
            <div className="link-group">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#ai">AI Advisor</a>
                </li>
                <li>
                  <a href="#security">Security</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#docs">Documentation</a>
                </li>
                <li>
                  <a href="#api">API Reference</a>
                </li>
                <li>
                  <a href="#community">Community</a>
                </li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} FinTrackAI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Built with ❤️ using MERN Stack</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
