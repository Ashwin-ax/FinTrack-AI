import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        config,
      );

      // Store token and user data in Cookies for 7 days
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 7 });

      // Redirect to Dashboard (we will create this later)
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorMsg(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join FinTrackAI and start your journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Inline Error Message */}
          {errorMsg && <div className="inline-error">{errorMsg}</div>}

          <div className="input-group">
            <HiOutlineUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

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

          <div className="input-group">
            <HiOutlineLockClosed className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
