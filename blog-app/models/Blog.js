import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Blog", blogSchema);
