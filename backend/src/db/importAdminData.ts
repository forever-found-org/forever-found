import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./adminModel";
import fs from "fs";
import path from "path";

dotenv.config();

const importAdmins = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ DB Connected");

    // Read the JSON file
    const filePath = path.join(__dirname, "../../admin.json"); // adjust if needed
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Format admin data (matches schema)
    const formattedData = data.map((admin: any) => ({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role || "ADMIN",
      status: admin.status || "ACTIVE",
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      lastLogin: admin.lastLogin || null
    }));

    // Insert / Update admins using email as unique key
    for (const admin of formattedData) {
      await Admin.updateOne(
        { email: admin.email },
        admin,
        { upsert: true }
      );
    }

    console.log("✅ Admin Data Imported Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing admin data:", err);
    process.exit(1);
  }
};

importAdmins();
