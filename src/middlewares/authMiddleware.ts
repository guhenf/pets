import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const securityHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    next();
  });
};