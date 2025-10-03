import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db/db";
import ngoRoutes from "./server/ngoRoutes";
import childrenRoutes from "./server/childrenRoutes";
import adopterRoutes from "./server/adopterRoutes";
import meetingRoutes from "./server/meetingRoutes";
import { cancelExpiredMeetings } from "./autoCancel";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static folders
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/ngo_gallery", express.static(path.join(__dirname, "../ngo_gallery")));
app.use("/multer_uploads", express.static(path.join(__dirname, "../multer_uploads")));

// Routes
app.use("/api/ngos", ngoRoutes);
app.use("/api/children", childrenRoutes);
app.use("/api/adopter", adopterRoutes);
app.use("/api/meetings", meetingRoutes);

// Connect to DB
connectDB();

// ----------------- Auto-cancel expired meetings ----------------- //
// Run immediately on server start
(async () => {
  try {
    const result = await cancelExpiredMeetings();
    if (result.cancelledCount > 0) {
      console.log(`[AutoCancel] Cancelled ${result.cancelledCount} expired meetings on startup.`);
    }
  } catch (err) {
    console.error("[AutoCancel] Error on startup:", err);
  }
})();

// Schedule repeated check every 10 minutes
setInterval(async () => {
  try {
    const result = await cancelExpiredMeetings();
    if (result.cancelledCount > 0) {
      console.log(`[AutoCancel] Cancelled ${result.cancelledCount} expired meetings.`);
    }
  } catch (err) {
    console.error("[AutoCancel] Error:", err);
  }
}, 10 * 60 * 1000); // 10 minutes
// ----------------------------------------------------------------- //

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
