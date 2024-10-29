import { Request, Response } from "express";
import authService from "../services/authService";

export class AuthController {

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(201).json(result);
  }
}

export default new AuthController();