import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    const res = await mongoose.connection
      .collection("ngos")
      .updateMany(
        {},
        {
          $unset: {
            image: "",
          },
        }
      );

    console.log("NGOs matched:", res.matchedCount);
    console.log("NGOs modified:", res.modifiedCount);

    await mongoose.disconnect();
    console.log("✅ image field removed from NGOs");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

run();
