import userModel from "../models/user.model.js";
import {uploadProfileImage} from '../services/storage.services.js';
import postModel from '../models/post.model.js';
import mongoose from "mongoose";
/**
 * -Get User Profile and Posts
 * -/api/user/:id
 */

async function getUserProfileandPosts(req, res) {
    try {
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const user = await userModel
            .findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const posts = await postModel
            .find({
                user: userId,
            })
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            message: "Profile fetched successfully",
            profile: {
                user: {
                    _id: user._id,
                    username: user.username,
                    profileImage: user.profileImage,
                    followers: user.followers,
                    following: user.following,
                },
                posts,
            },
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Failed to fetch profile",
        });
    }
}


/**
 * -Follow a User
 * -/api/user/:id/follow
 */

async function followUser(req, res) {
    try {
        const currentUserId = req.user.userId;
        const targetUserId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        // Prevent following yourself
        if (currentUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself",
            });
        }

        const targetUser = await userModel.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Add target user to current user's following
        await userModel.findByIdAndUpdate(
            currentUserId,
            {
                /*
                Don't
                $push: {
                    following: targetUserId
                }
                because the same user could potentially get added multiple times.    
                */

                // MongoDB won't add the ID if it's already present.
                $addToSet: {
                    following: targetUserId,
                },
            }
        );

        // Add current user to target user's followers
        await userModel.findByIdAndUpdate(
            targetUserId,
            {
                $addToSet: {
                    followers: currentUserId,
                },
            }
        );

        return res.status(200).json({
            message: "User followed successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to follow user",
        });
    }
}
/**
 * -Unfollow a User
 * -/api/user/:id/unfollow
 */

async function unfollowUser(req, res) {
    try {
        const currentUserId = req.user.userId;
        const targetUserId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        if (currentUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot unfollow yourself",
            });
        }

        const targetUser = await userModel.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await userModel.findByIdAndUpdate(
            currentUserId,
            {
                $pull: {
                    following: targetUserId,
                },
            }
        );

        await userModel.findByIdAndUpdate(
            targetUserId,
            {
                $pull: {
                    followers: currentUserId,
                },
            }
        );

        return res.status(200).json({
            message: "User unfollowed successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to unfollow user",
        });
    }
}

/**
 * -List Of Followers
 * -/api/user/:id/followers
 */
async function followersList(req, res) {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const user = await userModel
            .findById(userId)
            .select("followers")
            .populate("followers", "username profileImage");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Followers fetched successfully",
            followers: user.followers,
        });


    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Failed to fetched followers",
        });
    }
}


/**
 * -List Of Following
 * -/api/user/:id/following
 */
async function followingList(req, res) {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const user = await userModel
            .findById(userId)
            .select("following")
            .populate("following", "username profileImage");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Following fetched successfully",
            following: user.following,
        });


    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Failed to fetched following",
        });
    }
}

/**
 * -Update Profile Bio/Profile Image
 * -/api/user/profile
 */

async function userProfile(req, res) {
    try {
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        const { bio } = req.body || {};
        const profileImage = req.file;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Update bio if provided
        if (bio !== undefined) {
            user.bio = bio;
        }

        // Upload profile image if provided
        if (profileImage) {
            const result = await uploadProfileImage(
                profileImage.buffer
            );

            user.profileImage = result.secure_url;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to update profile",
        });
    }
}

export{
    userProfile,
    getUserProfileandPosts,
    followUser,
    unfollowUser,
    followersList,
    followingList
}
