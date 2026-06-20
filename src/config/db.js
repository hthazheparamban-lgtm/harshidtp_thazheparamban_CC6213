const mongoose = require("mongoose");

// Establish a connection to the MongoDB database.
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