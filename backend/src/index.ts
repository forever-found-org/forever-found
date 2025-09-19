import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db/db";
import ngoRoutes from "./server/ngoRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/ngo_gallery", express.static(path.join(__dirname, "../ngo_gallery")));

// All routes
app.use("/api/ngos", ngoRoutes); // Later add adopterRoutes, childrenRoutes here

connectDB();
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
