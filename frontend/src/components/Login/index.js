import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        { email: formData.email, password: formData.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 🔥 REQUIRED
        },
      );

      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Invalid Credentials",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to manage your finances</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Inline Error Message */}
          {errorMsg && <div className="inline-error">{errorMsg}</div>}

          <div className="input-group">
            <HiOutlineMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <HiOutlineLockClosed className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          </div>

          <div className="forgot-pass">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <TailSpin
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="loading"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
