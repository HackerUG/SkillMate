import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Error fetching profile");

        setUser(data.user);
      } catch (err) {
        console.error(err);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1200);
  };

  if (!user)
    return (
      <div className="profile-loading">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <motion.div
      className="profile-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <motion.div
        className="profile-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <motion.div
          className="profile-avatar"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <img
            src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.username}`}
            alt="avatar"
          />
        </motion.div>

        <h2 className="profile-name">👋 Hey, {user.username}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-joined">
          Joined on{" "}
          <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
        </p>

        <motion.div
          className="profile-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="profile-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#5ce1e6" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.info("Profile editing coming soon!")}
          >
            Edit Profile
          </motion.button>

          <motion.button
            className="logout-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
