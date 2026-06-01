const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

/**
 * Import authentication routes
 * containing register and login endpoints.
 */
const authRoutes = require("./routes/authRoutes");

/**
 * Initialize Express application
 */
const app = express();

/**
 * Middleware Configuration
 * 
 * express.json()  -> Parses incoming JSON requests
 * cors()          -> Enables Cross-Origin Resource Sharing
 * helmet()        -> Adds HTTP security headers
 * morgan("dev")   -> Logs HTTP requests in development mode
 */
app.use(express.json());

app.use(cors());

// Helmet temporarily disabled during local testing
// app.use(helmet());

app.use(morgan("dev"));

/**
 * Root route
 * 
 * Used for API health check and testing
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Conduit API Running"
  });
});

/**
 * Authentication route middleware
 * 
 * Base URL:
 * /api/auth
 */
app.use("/api/auth", authRoutes);

/**
 * Export configured Express application
 */
module.exports = app;