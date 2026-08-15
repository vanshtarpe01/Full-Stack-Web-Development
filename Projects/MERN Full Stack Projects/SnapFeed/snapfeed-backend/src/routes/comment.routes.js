import express from 'express';

const router = express.Router();

// /api/comment

// /api/comment/:postId Add a comment to a post
router.post("/:postId", );

// /api/comment/:postId Get all comment of a post
router.get("/:postId", );

// /api/comment/:id  Delete a comment
router.delete("/:id",);

export default router;