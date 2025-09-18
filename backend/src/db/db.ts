import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
