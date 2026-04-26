import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "./index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo - Anchored Left */}
        <div className="nav-logo">
          <span className="logo-icon">●</span>
          <span className="logo-text">
            FinTrack<span className="text-highlight">AI</span>
          </span>
        </div>

        {/* Right Side Group (Links + Buttons) */}
        <div className={`nav-menu-wrapper ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#features" onClick={() => setIsOpen(false)}>
                Features
              </a>
            </li>
            <li>
              <a href="#aicoach" onClick={() => setIsOpen(false)}>
                AI Coach
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-signup">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
