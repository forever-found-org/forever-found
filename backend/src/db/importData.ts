import mongoose from "mongoose";
import dotenv from "dotenv";
import NGO from "./ngoModel";
import fs from "fs";
import path from "path";

dotenv.config();

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ DB Connected");

    // Read the JSON file
    const filePath = path.join(__dirname, "../../ngos.json"); // adjust path according to your structure
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Map testimonials: message → feedback
    const formattedData = data.map((ngo: any) => ({
      name: ngo.name,
      location: ngo.location,
      yearOfEstablishment: ngo.yearOfEstablishment,
      website: ngo.website,
      contact: ngo.contact,
      email: ngo.email,
      registrationNumber: ngo.ngoRegistrationNumber,
      caraRegistrationNumber: ngo.caraRegistrationNumber,
      verified: ngo.verified,
      about: ngo.about,
      numberOfChildren: ngo.numberOfChildren,
      image: ngo.image,
      gallery: ngo.gallery || [],
      testimonials: ngo.testimonials?.map((t: any) => ({
        name: t.name,
        role: t.role,
        feedback: t.message,
      })),
      socialId: ngo.socialId,
      password: ngo.password 
    }));

    // Insert into DB using upsert to avoid duplicates
    for (const ngo of formattedData) {
      await NGO.updateOne({ name: ngo.name }, ngo, { upsert: true });
    }

    console.log("✅ NGO Data Imported Permanently!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
};

importData();
