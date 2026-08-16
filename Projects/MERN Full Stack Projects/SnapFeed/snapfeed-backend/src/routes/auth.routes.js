import express from 'express';
import {
    userRegisterController,
    userLoginController
} from '../controllers/auth.controller.js'
const router = express.Router();

// /api/auth

// /api/auth/register Create a user
router.post("/register", userRegisterController);

// /api/auth/login Login
router.post("/login", userLoginController);

// /api/auth/me Get user login in
// router.get("/me",);

export default router;
