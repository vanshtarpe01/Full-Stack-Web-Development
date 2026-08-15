import express from 'express';

const router = express.Router();

// /api/post

// /api/post/  Create a post with image
router.get("/", );

// /api/post/feed Get the post of followers and self
router.get("/feed", );

// /api/post/:id Get the details of a single post
router.get("/:id", );

// /api/post/:id Delete the post of self
router.delete("/:id", );

// /api/post/:id/like Like a post
router.put("/:id/like", );

// /api/post/:id/unlike Unlike a post
router.put(":id/unlike", );

export default router;