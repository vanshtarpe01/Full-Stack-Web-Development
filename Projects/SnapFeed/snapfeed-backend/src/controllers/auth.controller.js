import "dotenv/config";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

/**
 * User Register Controller
 * POST /api/auth/register
 */
async function userRegisterController(req, res) {
    try {
        const { username, email, password } = req.body;

        const isExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isExists) {
            return res.status(422).json({
                message: "Username or email already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


/**
 * User Login Controller
 * POST /api/auth/login
 */
async function userLoginController(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials. Please check username/email and password"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);

        return res.status(200).json({
            message: "User login successful",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export {
    userRegisterController,
    userLoginController
};