import { Router } from "express";
import { getMe, login, logout, postUser, refreshtoken, verifyOtp } from "../controllers/user.controller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post('/user/signup', postUser);
userRouter.post('/user/verify-otp', verifyOtp);
userRouter.post('/user/login', login);
userRouter.get('/user/me', userMiddleware,  getMe);
userRouter.get('/user/logout', userMiddleware, logout);
userRouter.post('/user/refresh-token', refreshtoken);


