import UserModel from "../models/UserModel";
import { compareHashedPassword, validateLoginInput } from "../utils/auth.util";

export const LoginService = {
  async login(email: string, password: string) {
    // 1. Input validation
    validateLoginInput(email, password);

    // 2. Find user
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");

    // 3. Compare password
    const isValid = await compareHashedPassword(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return user;
  },
};
