import express from "express";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';
import commentRouter from './routes/comment.routes.js';
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);

export default app;
