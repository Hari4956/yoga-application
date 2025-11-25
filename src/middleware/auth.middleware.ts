import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const UserJwt = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    // Read token from cookie OR header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
};
