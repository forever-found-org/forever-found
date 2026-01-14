import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected");

    const res = await mongoose.connection
      .collection("ngos")
      .updateMany(
        {
          createdAt: { $exists: false },
          updatedAt: { $exists: true },
        },
        [
          {
            $set: {
              createdAt: "$updatedAt",
            },
          },
        ]
      );

    console.log("Matched:", res.matchedCount);
    console.log("Modified:", res.modifiedCount);

    await mongoose.disconnect();
    console.log("✅ Done");
  } catch (err) {
    console.error("❌ Failed:", err);
    process.exit(1);
  }
};

run();
