import mongoose from "mongoose";
import dotenv from "dotenv";
import NGO from "./db/ngoModel";

dotenv.config();

const run = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to DB");

    const res = await NGO.updateMany(
      {
        $or: [
          { contactPersonName: { $exists: false } },
          { contactPersonDesignation: { $exists: false } },
        ],
      },
      {
        $set: {
          contactPersonName: null,
          contactPersonDesignation: null,
        },
      }
    );

    console.log(`✅ NGOs updated: ${res.modifiedCount}`);

    await mongoose.disconnect();
    console.log("✅ Migration complete, disconnected from DB");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    await mongoose.disconnect();
  }
};

run();
