import mongoose from "mongoose";
import dotenv from "dotenv";
import NGO from "./ngoModel";
import Child from "./childrenModel";
import fs from "fs";
import path from "path";

dotenv.config();

const importChildrenBulk = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ DB Connected");

    const filePath = path.join(__dirname, "../../children.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    const childrenToInsert = [];

    for (const child of data) {
      const ngo = await NGO.findById(child.ngoId);
      if (!ngo) {
        console.warn(`⚠️ NGO not found for child: ${child.name}`);
        continue;
      }

      childrenToInsert.push({
        ngoId: ngo._id,
        name: child.name,
        age: child.age,
        gender: child.gender,
        dateOfBirth: child.dateOfBirth || null,
        healthStatus: child.healthStatus || "",
        educationLevel: child.educationLevel || "",
        gallery: child.gallery || [],
        adoptionStatus: child.adoptionStatus || "Available",
        adopterId: child.adopterId || null,
      });
    }

    if (childrenToInsert.length > 0) {
      const result = await Child.insertMany(childrenToInsert);
      console.log(`✅ Inserted ${result.length} children successfully!`);
    } else {
      console.log("⚠️ No valid children to import.");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing children data:", err);
    process.exit(1);
  }
};

importChildrenBulk();
