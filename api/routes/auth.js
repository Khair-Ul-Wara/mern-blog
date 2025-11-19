import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ==================== REGISTER ====================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists (by email or username)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Error in register route:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==================== LOGIN ====================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token (include username for frontend)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    // Return user info + token
    res.status(200).json({
      token,
      username: user.username,
      id: user._id,
      email: user.email,
      profilePic: user.profilePic || "",
    });
  } catch (err) {
    console.error("❌ Error in login route:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
