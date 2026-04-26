import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-icon">
          <AlertCircle size={64} color="#60a5fa" />
        </div>

        <h1 className="error-code">404</h1>
        <h2 className="error-title">Lost in Space?</h2>
        <p className="error-message">
          The page you are looking for doesn't exist or has been moved. Let's
          get your finances back on track.
        </p>

        <button
          className="back-home-btn"
          onClick={() => navigate("/dashboard")}
        >
          <Home size={20} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
