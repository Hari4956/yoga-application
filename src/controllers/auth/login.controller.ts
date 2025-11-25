import { Request, Response } from "express";
import { generateToken, formatUserResponse } from "../../utils/auth.util";
import { LoginService } from "../../services/LoginService";

export const LoginController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // console.log(req.body);

      const user = await LoginService.login(email, password);

      // Create JWT using util
      const token = generateToken(user._id.toString());

      // Set cookie here
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // for localhost
        sameSite: "lax",
      });

      return res.json({
        success: true,
        message: "Login successful",
        data: formatUserResponse(user),
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};
