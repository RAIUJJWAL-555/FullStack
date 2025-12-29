import express from "express";

import { loginUser,adminLogin,registerUser, getUserProfile } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);
userRouter.post('/admin',adminLogin);
userRouter.get('/profile',authUser, getUserProfile);

export default userRouter;