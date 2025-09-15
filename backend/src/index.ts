import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API route to fetch NGO data
app.get("/api/ngos", (req: Request, res: Response) => {
  const ngosPath = path.join(__dirname, "../ngos.json");

  fs.readFile(ngosPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading ngos.json:", err);
      return res.status(500).json({ message: "Failed to read NGO data" });
    }

    try {
      const ngos = JSON.parse(data);

      // Prepend /uploads/ to image path for each NGO
      const ngosWithImages = ngos.map((ngo: any) => ({
        ...ngo,
        image: `/uploads/${ngo.image}` // full path for frontend
      }));

      res.json(ngosWithImages);
    } catch (parseErr) {
      console.error("Error parsing ngos.json:", parseErr);
      res.status(500).json({ message: "Invalid JSON format in ngos.json" });
    }
  });
});

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, (err?: any) => {
  if (err) console.error("Server failed to start:", err);
  else console.log(`Server running on http://localhost:${PORT}`);
});