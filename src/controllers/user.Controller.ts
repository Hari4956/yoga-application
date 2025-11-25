// controllers/userController.ts
import { Request, Response } from "express";
import { userService } from "../services/UserServices";
import { ICreateUserRequest, IGetUsersParams } from "../types/user.types";

export const userController = {
  // Get all users with pagination
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = "1", limit = "10" } = req.query;
      // console.log(req.query);

      // Input validation
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);

      if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        res.status(400).json({
          success: false,
          error: "Page and limit must be positive numbers",
        });
        return;
      }

      const params: IGetUsersParams = {
        page: pageNum,
        limit: limitNum,
      };

      // Call service
      const result = await userService.getAllUsers(params);

      // Send response
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  // Create new user
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        password,
        mobileNumber,
        country,
        role,
      }: ICreateUserRequest = req.body;
      // console.log(req.body);

      // Validation
      if (!name || !email || !password || !country || !mobileNumber) {
        res.status(400).json({
          success: false,
          error:
            "Name, email, country, mobile number and password are required",
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          error: "Password must be at least 6 characters long",
        });
        return;
      }

      // Email format validation
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          error: "Please provide a valid email address",
        });
        return;
      }

      if (mobileNumber && !/^\+?[1-9]\d{1,14}$/.test(mobileNumber)) {
        res.status(400).json({
          success: false,
          error: "Please provide a valid mobile number",
        });
        return;
      }

      // Call service
      const newUser = await userService.createUser({
        name,
        email,
        password,
        mobileNumber,
        country,
        role,
      });

      res.status(201).json({
        success: true,
        data: newUser,
        message: "User created successfully",
      });
    } catch (error) {
      const err = error as Error;

      if (err.message.includes("already exists")) {
        res.status(409).json({
          success: false,
          error: err.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: "User ID is required",
        });
        return;
      }

      // Call service
      const user = await userService.getUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      const err = error as Error;

      if (err.message.includes("not found")) {
        res.status(404).json({
          success: false,
          error: err.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password, mobileNumber, country } = req.body;

      // console.log(req.body);

      if (!id) {
        res.status(400).json({
          success: false,
          error: "User ID is required",
        });
        return;
      }

      if (!name && !email && !password && !mobileNumber && !country) {
        res.status(400).json({
          success: false,
          error:
            "At least one field (name, email, password, mobile number, country) must be provided for update",
        });
        return;
      }

      // Email validation if provided
      if (email) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
          res.status(400).json({
            success: false,
            error: "Please provide a valid email address",
          });
          return;
        }
      }

      // Mobile number validation if provided
      if (mobileNumber && !/^\+?[1-9]\d{1,14}$/.test(mobileNumber)) {
        res.status(400).json({
          success: false,
          error: "Please provide a valid mobile number",
        });
        return;
      }

      // Password validation if provided
      if (password) {
        if (password.length < 6) {
          res.status(400).json({
            success: false,
            error: "Password must be at least 6 characters long",
          });
          return;
        }
      }

      const updateData = { name, email, password, mobileNumber, country };

      // Call service
      const updatedUser = await userService.updateUser(id, updateData);

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      const err = error as Error;

      if (err.message.includes("not found")) {
        res.status(404).json({
          success: false,
          error: err.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: "User ID is required",
        });
        return;
      }
      const deletedUser = await userService.deleteUser(id);

      res.status(200).json({
        success: true,
        data: deletedUser,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete user",
      });
    }
  },
};
