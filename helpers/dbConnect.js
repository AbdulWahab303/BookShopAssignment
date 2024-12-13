import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected!!!");
  }
  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/"
    );
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB Connecion failed ", error);
    process.exit(1);
  }
}

export default dbConnect;
