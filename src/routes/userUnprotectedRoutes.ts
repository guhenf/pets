import { Router } from "express";
import { createUser } from "../controllers/usersController";

export const usersUnprotectedRouter = Router().post("/users", createUser);