import express from 'express';

const router = express.Router();

// /api/user

// /api/user/:id get user profile and their posts
router.get("/:id", );

// /api/user/:id/follow Follow a user
router.put("/:id/follow", );

// /api/user/:id/unfollow Unfollow a user
router.put("/:id/unfollow", );

// /api/user/:id/followers Get the all followers of user
router.get("/:id/followers", );

// /api/user/:id/following Get all the following of user
router.get("/:id/following", );

// /api/user/profile For change bio or profile pic
router.put("/profile", );

export default router;