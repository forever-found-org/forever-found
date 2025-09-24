import mongoose from "mongoose";
import dotenv from "dotenv";
import Child from "./db/childrenModel";
import NGO from "./db/ngoModel";

dotenv.config();

const run = async () => {
  try {
    const mongoUri: string = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to DB");

    // Update Children documents that don't have canEdit
    const childRes = await Child.updateMany(
  { canEdit: { $exists: false } },
  { $set: { canEdit: true } }
);
console.log("Children update result:", childRes);
console.log(`Children updated: ${childRes.modifiedCount ?? 0}`);

const ngoRes = await NGO.updateMany(
  { canEdit: { $exists: false } },
  { $set: { canEdit: true } }
);
console.log("NGOs update result:", ngoRes);
console.log(`NGOs updated: ${ngoRes.modifiedCount ?? 0}`);


    await mongoose.disconnect();
    console.log("✅ Migration complete, disconnected from DB");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    await mongoose.disconnect();
  }
};

// Execute the migration
run();
