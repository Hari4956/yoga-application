import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Validate user login input
 */
export const validateLoginInput = (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

/**
 * Generate JWT token
 */
export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

/**
 * Compare hashed password
 */
export const compareHashedPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

/**
 * Format login response (optional)
 */
export const formatUserResponse = (user: any) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};
