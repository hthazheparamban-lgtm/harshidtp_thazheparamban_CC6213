const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const commentRoutes = require(
  "./routes/commentRoutes"
);

const articleRoutes = require("./routes/articleRoutes");

/**
 * Import authentication routes
 */
const authRoutes = require("./routes/authRoutes");

/**
 * Initialize Express application
 */
const app = express();

/**
 * Middleware Configuration
 */
app.use(express.json());

app.use(cors());

// app.use(helmet());

app.use(morgan("dev"));

/**
 * Root route
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Conduit API Running"
  });
});

/**
 * Authentication routes
 */
app.use("/api/auth", authRoutes);

/**
 * Article routes
 */
app.use("/api/articles", articleRoutes);
app.use("/api/articles", commentRoutes);
/**
 * Export configured Express application
 */


module.exports = app;