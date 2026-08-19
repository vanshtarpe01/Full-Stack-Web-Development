import commentModel from '../models/comment.model.js';
import mongoose from 'mongoose';
import userModel from '../models/user.model.js';
import postModel from '../models/post.model.js';

/**
 * -Add a comment to a post
 * -/api/comment/:postId
 */
async function commentOnPost(req, res) {

    try {
        const { postId } = req.params;
        const userId = req.user.userId;
        const { text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post id"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const comment = await commentModel.create(
            {
                post: postId,
                user: userId,
                text: text.trim()
            }
        );

        await postModel.findByIdAndUpdate(postId, {
            $push: {
                comments: comment._id
            }
        });


        return res.status(201).json({
            message: "Comment added successfully",
            comment,
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Failed to comment",
        });

    }
}

/**
 * -Get All Comments for a post
 * -/api/comment/:postId
 */

async function getAllPostComment(req, res) {
    try {
        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        const post = await postModel
            .findById(postId)
            .select("comments")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username profileImage"
                }
            });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Comments fetched successfully",
            comments: post.comments
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch comments"
        });
    }
}

/**
 * Delete a comment
 * /api/comment/:commentId
 */

async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        const post = comment.post
            ? await postModel.findById(comment.post)
            : await postModel.findOne({ comments: commentId });

        const isCommentOwner = comment.user?.toString() === userId;
        const isPostOwner = post?.user?.toString() === userId;

        if (!isCommentOwner && !isPostOwner) {
            return res.status(403).json({
                message: "You are not allowed to delete this comment"
            });
        }

        await commentModel.deleteOne({
            _id: commentId
        });

        // Remove comment ID from the post
        if (post) {
            await postModel.findByIdAndUpdate(post._id, {
                $pull: {
                    comments: comment._id
                }
            });
        }

        return res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete comment"
        });
    }
}

export {
    commentOnPost,
    getAllPostComment,
    deleteComment
}
