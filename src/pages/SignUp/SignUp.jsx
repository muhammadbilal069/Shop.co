import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline
} from "react-icons/io5";
import "./SignUp.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  
  // Notification State
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showPopup = (message, type) => {
    setNotification({ show: true, message, type });
    if (type === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 second baad login page par bhej dega
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:5000/auth/signup", {
  //       name: formData.fullName,
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     showPopup("Account created successfully! Redirecting to login...", "success");
  //   } catch (err) {
  //     const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Something went wrong";
  //     showPopup(errorMsg, "error");
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://shop-co-backend-sigma.vercel.app/auth/signup", {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    showPopup("Account created successfully! Redirecting to login...", "success");
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Something went wrong";
    showPopup(errorMsg, "error");
  }
};

  return (
    <div className="signup-page">
      {/* Custom Popup Notification */}
      {notification.show && (
        <div className={`custom-popup ${notification.type}`}>
          {notification.type === "success" ? <IoCheckmarkCircleOutline /> : <IoAlertCircleOutline />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="signup-container">
        {/* Left Side (Banner) */}
        <div className="signup-banner">
          <div className="banner-overlay">
            <h2>Join the Trend<br />Create Your Style</h2>
            <p>
              Sign up today and get exclusive access to new arrivals, 
              special offers, and personalised fashion recommendations with SHOP.CO.
            </p>
          </div>
        </div>

        {/* Right Side (Form Content) */}
        <div className="signup-content">
          <div className="signup-logo">
            SHOP<span>.CO</span>
          </div>

          <h1>Create Account</h1>
          <p className="signup-subtitle">
            Sign up to start shopping and exploring the latest collection
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <IoPersonOutline className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <IoMailOutline className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <IoLockClosedOutline className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
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

            <div className="signup-options">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the <Link to="/terms">Terms & Conditions</Link>
                </span>
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>

          <p className="login-redirect-text">
            Already have an account?
            <Link to="/login"> Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;