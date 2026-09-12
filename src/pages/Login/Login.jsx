import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline 
} from "react-icons/io5";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  // Notification State
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const showPopup = (message, type) => {
    setNotification({ show: true, message, type });
    if (type === "success") {
      setTimeout(() => {
        navigate("/"); // Home page par redirect kar dega login hone ke baad
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      showPopup("Login successful! Welcome back.", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      showPopup(errorMsg, "error");
    }
  };

  return (
    <div className="login-page">
      {/* Custom Popup Notification */}
      {notification.show && (
        <div className={`custom-popup ${notification.type}`}>
          {notification.type === "success" ? <IoCheckmarkCircleOutline /> : <IoAlertCircleOutline />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="login-container">
        <div className="login-content">
          <div className="login-logo">
            SHOP<span>.CO</span>
          </div>

          <h1>Welcome Back!</h1>
          <p className="login-subtitle">
            Login to your account and continue shopping with SHOP.CO
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <IoMailOutline className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="input-wrapper">
                <IoLockClosedOutline className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>

        <div className="login-banner">
          <div className="banner-overlay">
            <h2>Find Clothes<br />That Matches Your Style</h2>
            <p>Discover the latest trends and build your perfect wardrobe with SHOP.CO.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;