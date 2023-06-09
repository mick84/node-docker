import * as authCtrl from "../controllers/authCtrl.js";
import { Router } from "express";
export const userRouter = Router();
userRouter.post("/signup", authCtrl.signUp);
userRouter.post("/login", authCtrl.login);
