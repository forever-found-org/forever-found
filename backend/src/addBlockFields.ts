import mongoose from "mongoose";
import dotenv from "dotenv";
import Adopter from "./db/adopterModel";

dotenv.config();

const run = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to DB");

    const res = await Adopter.updateMany(
      { isBlocked: { $exists: false } },
      {
        $set: {
          isBlocked: false,
          blockReason: null,
          blockedAt: null,
        },
      }
    );

    console.log(`✅ Adopters updated: ${res.modifiedCount}`);

    await mongoose.disconnect();
    console.log("✅ Migration complete, disconnected from DB");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    await mongoose.disconnect();
  }
};

run();
