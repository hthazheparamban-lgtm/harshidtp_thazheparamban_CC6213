const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Comment routes
const commentRoutes = require(
  "./routes/commentRoutes"
);

// Article routes
const articleRoutes = require(
  "./routes/articleRoutes"
);

// Authentication routes
const authRoutes = require(
  "./routes/authRoutes"
);

// Create Express application
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Security headers (disabled during development)
// app.use(helmet());

// HTTP request logging
app.use(morgan("dev"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Conduit API Running"
  });
});

// Authentication endpoints
app.use("/api/auth", authRoutes);

// Article endpoints
app.use("/api/articles", articleRoutes);

// Comment endpoints
app.use("/api/articles", commentRoutes);

// Export Express app
module.exports = app;