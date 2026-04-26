import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Cookies from "js-cookie";
import "./index.css";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    window.location.href = "/login";
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
    { name: "Budget", path: "/budget" },
    { name: "Investment", path: "/investments" },
  ];

  return (
    <nav className="main-nav">
      <div className="main-nav-container">
        {/* Logo - Anchored Left */}
        <Link to="/dashboard" className="main-nav-logo">
          <span className="m-logo-icon">●</span>
          <span className="m-logo-text">
            FinTrack<span className="m-text-highlight">AI</span>
          </span>
        </Link>

        {/* Right Side Group */}
        <div className={`main-nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="main-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={
                    location.pathname === link.path ? "active-link" : ""
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="m-mobile-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
