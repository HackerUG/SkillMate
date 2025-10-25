import "./navbar.css";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const HandleLogout = () => {
      logout();
      toast.info("Logged out successfully!");
      setTimeout(() => navigate("/login"), 1200);
    };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>S</span>kill<span>M</span>ate
      </div>

      
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/visualizer">Visualizer</a></li>
        <li><a href="/engineering">Subjects</a></li>
        <li><a href="/tools">Tools</a></li>
        <li><a href="/interview-prep">Internship Alert</a></li>
        <li><a href="/about">About</a></li>
        {!isAuthenticated ? (
          <li><a href="/login">Login</a></li>
        ) : (
          <>
            <li><a href="/profile">Profile</a></li>
            <li><button onClick={HandleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
