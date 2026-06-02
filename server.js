// Load environment variables
require("dotenv").config();

// Start Redis Pub/Sub subscriber
require("./src/subscribers/articleSubscriber");

// Import Express application
const app = require("./src/app");

// Import MongoDB connection
const connectDB = require("./src/config/db");

// Connect to MongoDB
connectDB();

// Configure server port
const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});