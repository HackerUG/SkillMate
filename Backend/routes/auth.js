import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const router = express.Router();

// validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// validate password strength
const isStrongPassword = (password) => {
  // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
  return passRegex.test(password);
};

//  SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Empty field check
    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ msg: "All fields are required." });

    // Email format check
    if (!isValidEmail(email))
      return res.status(400).json({ msg: "Invalid email format." });

    // Password match check
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match." });

    // Password strength check
    if (!isStrongPassword(password))
      return res.status(400).json({
        msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });

    // Duplicate user check
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ msg: "User already exists." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      msg: "Signup successful!",
      user: { id: newUser._id, username, email },
      token,
    });
  } catch (err) {
    console.error(err);
    // Handle MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    return res.status(409).json({ 
      msg: "A user with this email already exists (Duplicate Key Error).",
      error_code: 11000
    });
  }
  
  // Handle Mongoose Validation Error (e.g., a 'required' field failed)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      msg: "Validation Failed: Check model constraints.", 
      details: err.message 
    });
  }
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Empty field check
    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required." });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found." });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password." });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      msg: "Login successful!",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});



// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Protected profile route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


export default router;
