import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import { Request, Response } from "express";

class ChangePassword {
  public static async changePassword(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { user_email, oldPassword, newPassword } = req.body;
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ user_email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Kiểm tra mật khẩu cũ
      const isMatch = await bcrypt.compare(oldPassword, user.user_password);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect old password" });
      }

      // Mã hóa mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Cập nhật mật khẩu mới trong cơ sở dữ liệu
      user.user_password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: `Error changing password: ${(error as Error).message}`,
        });
    }
  }
}

export default ChangePassword;
