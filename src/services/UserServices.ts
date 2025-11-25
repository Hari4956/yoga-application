// services/userService.ts
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import {
  IUser,
  IUserResponse,
  ICreateUserRequest,
  IGetUsersParams,
  IUsersResponse,
  IUserStats,
} from "../types/user.types";

export const userService = {
  // Get all users
  async getAllUsers(params: IGetUsersParams): Promise<IUsersResponse> {
    try {
      const { page, limit } = params;
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        UserModel.find()
          .skip(skip)
          .limit(limit)
          .select("-password")
          .lean()
          .exec(),
        UserModel.countDocuments(),
      ]);

      const userResponses: IUserResponse[] = users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        country: user.country,
        mobileNumber: user.mobileNumber,
        createdAt: user.createdAt, // No error - guaranteed by schema
        updatedAt: user.updatedAt, // No error - guaranteed by schema
      }));

      return {
        users: userResponses,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalUsers: total,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch users: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  async createUser(userData: ICreateUserRequest): Promise<IUserResponse> {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({
        email: userData.email,
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const user = new UserModel(userData);

      await user.save();

      // Convert to response object
      const userResponse: IUserResponse = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        country: user.country,
        mobileNumber: user.mobileNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return userResponse;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  // Get user by ID
  async getUserById(userId: string): Promise<IUserResponse> {
    try {
      const user = await UserModel.findById(userId)
        .select("-password")
        .lean()
        .exec();

      if (!user) {
        throw new Error("User not found");
      }

      const userResponse: IUserResponse = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        country: user.country,
        mobileNumber: user.mobileNumber,
        createdAt: user.createdAt, // No error!
        updatedAt: user.updatedAt, // No error!
      };

      return userResponse;
    } catch (error) {
      throw new Error(
        `Failed to fetch user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  // Update user
  async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUserResponse> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      const userResponse: IUserResponse = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        country: user.country,
        mobileNumber: user.mobileNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return userResponse;
    } catch (error) {
      throw new Error(
        `Failed to update user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error(
        `Failed to delete user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  // Utility methods
  calculateProfileCompletion(user: IUser): number {
    let completion = 0;
    const fields = ["name", "email"]; // Only fields from your schema

    fields.forEach((field) => {
      if (user[field as keyof IUser]) completion += 50;
    });

    return completion;
  },

  calculateAccountAge(createdAt: Date): number {
    const now = new Date();
    const diffTime = now.getTime() - createdAt.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },
};
