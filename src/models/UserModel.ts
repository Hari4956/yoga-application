import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

// 🔐 Before save → hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
