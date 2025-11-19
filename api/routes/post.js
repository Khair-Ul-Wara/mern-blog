import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js"; // Needed for getting username
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ==================== CREATE POST ====================
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Get user info from DB using decoded token
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      username: user.username, // Assign username
      userId: req.user.id,
      image: req.body.image || "",
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("❌ Post creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== GET ALL POSTS (public) ====================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== GET SINGLE POST BY ID (public) ====================
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== UPDATE POST (protected) ====================
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only update your own post" });
    }

    const updatedData = {
      title: req.body.title,
      desc: req.body.desc,
    };

    if (req.body.image) updatedData.image = req.body.image;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== DELETE POST (protected) ====================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET posts by username
router.get("/user/:username", async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
