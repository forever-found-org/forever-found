import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    const res = await mongoose.connection
      .collection("adopters")
      .updateMany(
        {},
        {
          $set: {
            hasEditRequest: false,
            editRequestedAt: null,
          },
        }
      );

    console.log("Adopters matched:", res.matchedCount);
    console.log("Adopters modified:", res.modifiedCount);

    await mongoose.disconnect();
    console.log("✅ Edit request fields added to all adopters");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

run();
