const User = require("../models/User");

/**
 * Follow user
 */
const followUser = async (req, res) => {

  try {

    const targetUser = await User.findById(
      req.params.id
    );

    if (!targetUser) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (
      targetUser._id.toString() ===
      req.user._id.toString()
    ) {

      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself"
      });
    }

    const alreadyFollowing =
      req.user.following.includes(
        targetUser._id
      );

    if (alreadyFollowing) {

      return res.status(400).json({
        success: false,
        message: "Already following user"
      });
    }

    req.user.following.push(
      targetUser._id
    );

    targetUser.followers.push(
      req.user._id
    );

    await req.user.save();

    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: "User followed"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * Unfollow user
 */
const unfollowUser = async (req, res) => {

  try {

    const targetUser = await User.findById(
      req.params.id
    );

    if (!targetUser) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user.following =
      req.user.following.filter(

        (id) =>
          id.toString() !==
          targetUser._id.toString()
      );

    targetUser.followers =
      targetUser.followers.filter(

        (id) =>
          id.toString() !==
          req.user._id.toString()
      );

    await req.user.save();

    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: "User unfollowed"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * Get profile
 */
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      profile: {
        id: user._id,
        username: user.username,
        bio: user.bio,
        image: user.image,
        followers: user.followers.length,
        following: user.following.length
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  followUser,
  unfollowUser,
  getProfile
};