import { NextFunction, Request, Response } from "express";
import User from "../../../models/User.model";
import bcrypt from "bcrypt";
import SendNewPasswordEmail from "../../../helpers/Email";
class ForgotPassword {
  public static async ForgotPassword(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const newPassword = req.body.newPassword;
      await SendNewPasswordEmail.sendNewPasswordEmails(
        req.body.user_email,
        newPassword
      );
      return res.status(200).json({ message: "New password sent to email" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public static async resetPasswordRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { user_email } = req.body;
      const user = await User.findOne({ user_email: user_email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newPassword = ForgotPassword.generateRandomPassword(6);
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.user_password = hashedPassword;
      await user.save();
      req.body.newPassword = newPassword;
      next();
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  private static generateRandomPassword(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return newPassword;
  }
}

export default ForgotPassword;
