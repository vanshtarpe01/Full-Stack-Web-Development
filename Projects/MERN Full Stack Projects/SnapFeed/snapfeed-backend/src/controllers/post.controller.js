import mongoose from 'mongoose';
import postModel from '../models/post.model.js';
import userModel from '../models/user.model.js';
import { uploadPostImage } from '../services/storage.services.js';
/**
 * -Create a Post
 * -/api/post/
 */

async function createPost(req, res) {
    try {

        const { caption } = req.body;
        const postImage = req.file;

        if (!postImage) {
            return res.status(400).json({
                message: "Image is required",
            });
        }

        const result = await uploadPostImage(postImage.buffer);

        const post = await postModel.create({
            user: req.user.userId,
            caption: caption,
            image: result.secure_url,
            likes: [],
            comments: [],
        });

        res.status(201).json({
            message: "Post Created Successfully..",
            post: {
                user: post.user,
                caption: post.caption,
                image: post.image,
                likes: post.likes,
                comments: post.comments
            }
        });
    } catch (e) {
        console.log(e)
    }
}

/**
 * -Feed get post from follwers and self
 * /api/post/feed
 */

async function getFeedPosts(req, res) {
    try {
        const userId = req.user.userId;

        const user = await userModel
            .findById(userId)
            .select("following");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const feedUsers = [
            userId,
            ...user.following
        ];

        const posts = await postModel
            .find({
                user: {
                    $in: feedUsers
                }
            })
            .populate("user", "username profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch posts",
        });
    }
}

/**
 * -Get a Singe post
 * -/api/post/:id
 */

async function getSinglePost(req, res) {
    try {
        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID",
            });
        }

        const post = await postModel
            .findById(postId)
            .populate("user", "username profileImage");

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        return res.status(200).json({
            message: "Post fetched successfully",
            post,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch post",
        });
    }
}

/**
 * -Delete Own Post
 * -/api/post/:id
 */

async function deleteOwnPost(req, res) {
    try {
        const { postId } = req.body;


        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID",
            });
        }

        const deletedPost = await postModel.deleteOne({
            _id: postId,
            user: req.user.userId,
        });

        if (deletedPost.deletedCount === 0) {
            return res.status(404).json({
                message: "Post not found or you are not the owner",
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete post",
        });
    }
}

/**
 * -Like a post
 * -/api/post/:id/like
 */

async function likePost(req, res) {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID",
            });
        }

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({
                message: "Post already liked",
            });
        }

        post.likes.push(userId);

        await post.save();

        return res.status(200).json({
            message: "Post liked successfully",
            likes: post.likes,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to like post",
        });
    }
}

/**
 * -Unlike a post
 * -/api/post/:id/unlike
 */

async function unLikePost(req, res) {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID",
            });
        }

        const post = await postModel.findOneAndUpdate(
            {
                _id: postId,
                likes: userId,
            },
            {
                $pull: {
                    likes: userId,
                },
            },
            {
                new: true,
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found or post is not liked by you",
            });
        }

        return res.status(200).json({
            message: "Post unliked successfully",
            likes: post.likes,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to unlike post",
        });
    }
}

export{
    createPost,
    getFeedPosts,
    getSinglePost, 
    deleteOwnPost,
    likePost,
    unLikePost
}
