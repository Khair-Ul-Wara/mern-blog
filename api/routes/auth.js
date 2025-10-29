// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "User already exists" });

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.status(400).json({ error: "Invalid credentials" });

//     // create JWT token
//     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "7d" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// //temporary log
// router.post("/register", async (req, res) => {
//   console.log("📩 Incoming register request body:", req.body);

//   try {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password)
//       return res.status(400).json({ message: "Missing fields" });

//     // continue with bcrypt hashing, saving user...
//   } catch (err) {
//     console.error("❌ Error in register route:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ✅ Register route
router.post("/register", async (req, res) => {
  console.log("📩 Received request body:", req.body);

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully ✅" });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
