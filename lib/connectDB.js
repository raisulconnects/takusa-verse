import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("From lib/connectDB.js -> DB is already Connected!");

      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("From lib/connectDB.js -> Connected Successfully!");
  } catch (e) {
    console.error("From lib/connectDB.js -> Error Occured!");
  }
}
