const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MONGO_URL:", process.env.MONGO_URL);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Sir, The Mongo Database is successfully connected ${conn.connection.host}`
    );
  } catch (error) {
    console.log("Error with MongoDB connection:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
