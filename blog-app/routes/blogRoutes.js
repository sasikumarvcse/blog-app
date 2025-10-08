import express from "express";
import multer from "multer";
import Blog from "../models/Blog.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      author: req.user.name,
    });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ timestamp: -1 });
  res.json(blogs);
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBlog);
});

// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Blog deleted" });
});

export default router;
