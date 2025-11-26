import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const AdminAuth = (
  req: Request & { userId?: string; role?: string },
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
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };

    // Check role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin only",
      });
    }

    // Attach user info to request object
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized or expired token",
    });
  }
};
