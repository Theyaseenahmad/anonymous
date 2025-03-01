import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}

let isConnected: boolean = false;

const connectDb = async (): Promise<void> => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    mongoose.set("strictQuery", false); // Recommended setting in Mongoose 7+

    const db = await mongoose.connect(MONGO_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("❌ Failed to connect to MongoDB.");
  }
};

export default connectDb;
