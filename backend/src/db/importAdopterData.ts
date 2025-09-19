import mongoose from "mongoose";
import dotenv from "dotenv";
import Adopter from "./adopterModel"; // adjust path if adopterModel is elsewhere
import fs from "fs";
import path from "path";

dotenv.config();

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ DB Connected");

    // Read adopters.json
    const filePath = path.join(__dirname, "../../adopter.json"); // adjust if needed
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Map to schema
    const formattedData = data.map((adopter: any) => ({
      fullName: adopter.fullName,
      religion: adopter.religion,
      gender: adopter.gender,
      dateOfBirth: adopter.dateOfBirth,
      maritalStatus: adopter.maritalStatus,
      email: adopter.email,
      contactNumber: adopter.contactNumber,
      address: adopter.address,
      alternateContactNumber: adopter.alternateContactNumber,
      numberOfBiologicalChildren: adopter.numberOfBiologicalChildren,
      occupation: adopter.occupation,
      salaryPerAnnum: adopter.salaryPerAnnum,
      aadharNumber: adopter.aadharNumber,
      aadharImage: adopter.aadharImage,
      socialId: adopter.socialId || "",   // default empty
      password: adopter.password || ""    // default empty
    }));

    // Insert into DB using upsert
    for (const adopter of formattedData) {
      await Adopter.updateOne({ email: adopter.email }, adopter, { upsert: true });
    }

    console.log("✅ Adopter Data Imported Permanently!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
};

importData();
