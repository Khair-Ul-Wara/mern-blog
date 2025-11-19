import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// Single file upload
router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

export default router;
