import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_MS = 2000;

async function tryConnect(attempt) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    return true;
  } catch (error) {
    const msg = String(error?.message || error);
    const likelyAtlasIPIssue = msg.includes("whitelist") || msg.includes("IP") || msg.includes("Could not connect to any servers");
    console.error(`❌ MongoDB connection attempt ${attempt} failed:`, msg);
    if (likelyAtlasIPIssue) {
      console.error("ℹ️ Tip: In MongoDB Atlas → Network Access, add your current IP or 0.0.0.0/0 for testing.");
    }
    return false;
  }
}

const connectDB = async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const ok = await tryConnect(attempt);
    if (ok) return;
    if (attempt < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, RETRY_MS));
    }
  }
  console.error("❌ MongoDB Connection Failed after multiple attempts. Exiting.");
  process.exit(1);
};

export default connectDB;
