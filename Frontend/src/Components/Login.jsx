import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // local password check before sending to server
  if (isSignup && formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${isSignup ? "signup" : "login"}`;

    const payload = isSignup
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data;
    try {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }
    } catch {
      data = { message: "Invalid server response." };
    }

    // unified message extraction
    const serverMsg = data.msg || data.message || data.error || "Something went wrong";

    // ---- handle errors ----
    if (!res.ok) {
      // Normalize messages for clarity
      if (serverMsg.toLowerCase().includes("user not found")) {
        toast.error("User not found. Please sign up first.");
      } else if (serverMsg.toLowerCase().includes("invalid") && serverMsg.toLowerCase().includes("password")) {
        toast.error("Incorrect password. Please try again.");
      } else if (serverMsg.toLowerCase().includes("passwords do not match")) {
        toast.error("Passwords do not match!");
      } else if (serverMsg.toLowerCase().includes("already exists")) {
        toast.info("User already exists. Please log in instead.");
      } else if (serverMsg.toLowerCase().includes("invalid email")) {
        toast.warn("Please enter a valid email address.");
      } else if (serverMsg.toLowerCase().includes("weak")) {
        toast.warn("Password must be stronger.");
      } else {
        // fallback for anything else
        toast.error(serverMsg);
      }

      return;
    }

    // ---- success ----
    login(data.token);
    toast.success(isSignup ? "Account created successfully!" : "Login successful!");
    setTimeout(() => navigate("/profile"), 1200);
  } catch (err) {
    console.error("Auth error:", err);
    toast.error(err.message || "Something went wrong!");
  }
};




  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <motion.div
        className="auth-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <h2 className="auth-title">{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="auth-subtitle">
          {isSignup ? "Join our community!" : "Login to continue your journey"}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <AnimatePresence>
            {isSignup && (
              <motion.div
                className="input-group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label>Username</label>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@gmail.com"
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
            <label>Password</label>
          </div>

          <AnimatePresence>
            {isSignup && (
              <motion.div
                className="input-group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                />
                <label>Confirm Password</label>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="auth-btn"
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#5ce1e6" }}
            whileTap={{ scale: 0.95 }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
