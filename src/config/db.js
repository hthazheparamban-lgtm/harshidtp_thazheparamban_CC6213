const mongoose = require("mongoose");

/**
 * Establishes a connection to the MongoDB database
 * using the MONGO_URI environment variable.
 * 
 * Uses async/await to handle the asynchronous
 * database connection in a non-blocking way.
 */
const connectDB = async () => {
  try {

    // Connect to MongoDB database
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

  } catch (error) {

    // Log database connection errors
    console.error(
      "Database connection failed:",
      error.message
    );

    // Exit application if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;