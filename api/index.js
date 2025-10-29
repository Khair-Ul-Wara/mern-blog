// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import authRoutes from "./routes/auth.js";
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/auth", authRoutes);
// app.get("/api/auth/test", (req, res) => {
//   res.send("Auth route is connected ✅");
// });




// //  Static file setup (for images, later when we add upload feature)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// //  Basic route to check if server is working
// app.get("/", (req, res) => {
//   res.send("MERN Blog API is running 🚀");
// });

// //  Auth routes


// //  MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// //  Test models route
// app.get("/test-models", async (req, res) => {
//   try {
//     const users = await User.find();
//     const posts = await Post.find();
//     res.json({ users, posts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //  Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌿`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";  // ✅ Make sure this path is correct

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // 👈 VERY important: allows Express to parse JSON bodies

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "MERN Blog API is running 🚀" });
});

// ✅ Use auth routes
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌿`));
