import express from 'express';

const router = express.Router();
import authUser from '../middleware/auth.middleware.js';
import {
    userProfile,
    getUserProfileandPosts,
    followUser,
    unfollowUser,
    followersList,
    followingList
} from '../controllers/user.controller.js'
// /api/user

// /api/user/:id get user profile and their posts
router.get("/:id", authUser, getUserProfileandPosts);

// /api/user/:id/follow Follow a user
router.put("/:id/follow", authUser, followUser);

// /api/user/:id/unfollow Unfollow a user
router.put("/:id/unfollow", authUser, unfollowUser);

// /api/user/:id/followers Get the all followers of user
router.get("/:id/followers", authUser, followersList);

// /api/user/:id/following Get all the following of user
router.get("/:id/following", authUser, followersList);

// /api/user/profile For change bio or profile pic
router.put("/profile", authUser, userProfile);

export default router;