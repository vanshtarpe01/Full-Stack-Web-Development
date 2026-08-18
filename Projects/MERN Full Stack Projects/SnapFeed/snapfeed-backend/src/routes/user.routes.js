import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const profileImageUpload = upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 }
]);

function setProfileImageFile(req, res, next) {
    req.file =
        req.files?.profileImage?.[0] ||
        req.files?.profilePic?.[0] ||
        req.files?.image?.[0] ||
        req.files?.file?.[0];

    next();
}

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
router.get("/profile", authUser, getUserProfileandPosts);

// /api/user/:id/follow Follow a user
router.put("/:id/follow", authUser, followUser);

// /api/user/:id/unfollow Unfollow a user
router.put("/:id/unfollow", authUser, unfollowUser);

// /api/user/:id/followers Get the all followers of user
router.get("/:id/followers", authUser, followersList);

// /api/user/:id/following Get all the following of user
router.get("/:id/following", authUser, followingList);

// /api/user/profile For change bio or profile pic
router.put("/profile", authUser, profileImageUpload, setProfileImageFile, userProfile);

export default router;
