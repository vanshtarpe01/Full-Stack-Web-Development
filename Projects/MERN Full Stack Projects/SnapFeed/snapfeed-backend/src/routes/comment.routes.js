import express from 'express';
import {
    commentOnPost,
    getAllPostComment,
    deleteComment
} from '../controllers/comment.controller.js';
import authUser from '../middleware/auth.middleware.js';

const router = express.Router();


// /api/comment

// /api/comment/:postId Add a comment to a post
router.post("/:postId",  authUser, commentOnPost);

// /api/comment/:postId Get all comment of a post
router.get("/:postId",  authUser, getAllPostComment);

// /api/comment/:commentId  Delete a comment
router.delete("/:commentId", authUser, deleteComment);

export default router;
