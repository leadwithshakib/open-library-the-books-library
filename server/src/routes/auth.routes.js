import express from "express";
import { forgetPassword, resetPassword, signIn, signUp } from "../controllers/auth.controllers.js";

export const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/reset-password", resetPassword);
// authRouter.post("/sign-out", )
