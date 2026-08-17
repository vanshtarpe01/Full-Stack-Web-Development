import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const postImageUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "postImage", maxCount: 1 },
    { name: "file", maxCount: 1 }
]);

function setPostImageFile(req, res, next) {
    req.file =
        req.files?.image?.[0] ||
        req.files?.postImage?.[0] ||
        req.files?.file?.[0];

    next();
}

import {
    createPost,
    deleteOwnPost,
    likePost,
    unLikePost,
    getFeedPosts,
    getSinglePost
} from '../controllers/post.controller.js';

import authUser from '../middleware/auth.middleware.js';

// /api/post

// /api/post/  Create a post with image
router.post("/", authUser, postImageUpload, setPostImageFile, createPost);

// /api/post/feed Get the post of followers and self
router.get("/feed", authUser, getFeedPosts);

// /api/post/:id Get the details of a single post
router.get("/:postId", authUser, getSinglePost);

// /api/post/:id Delete the post of self
router.delete("/:postId", authUser, deleteOwnPost);

// /api/post/:id/like Like a post
router.put("/:postId/like", authUser, likePost);

// /api/post/:id/unlike Unlike a post
router.put("/:postId/unlike", authUser, unLikePost);

export default router;
