import express from "express";
import Comment from "../models/Comment.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Add a comment to a post
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user.id,
      username: req.user.username,
      text: req.body.text,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment (only owner)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
