const express = require("express");

const {
  followUser,
  unfollowUser,
  getProfile
} = require(
  "../controllers/profileController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/:id",
  getProfile
);

router.post(
  "/:id/follow",
  protect,
  followUser
);

router.delete(
  "/:id/follow",
  protect,
  unfollowUser
);

module.exports = router;