import { Router } from "express";
import authController from "../controllers/authController";

export const authRouter = Router().post("/token", authController.login);