import bcrypt from "bcrypt";
import User from "../../../models/User.model";

class Register {
  public static async Register(req: any, res: any): Promise<any> {
    // Lấy thông tin người dùng từ request
    const {
      user_name,
      user_email,
      user_phone_number,
      user_password,
      user_status,
      user_address,
      user_avatar,
      user_gender,
      user_role,
    } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    try {
      const existingUser = await User.findOne({ user_email });
      if (existingUser) {
        return res.status(400).json({
          error: "Account with that email already exists",
        });
      }
      // Mã hóa mật khẩu
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user_password, saltRounds);

      // Tạo người dùng mới
      const newUser = new User({
        user_name,
        user_email,
        user_phone_number,
        user_password: hashedPassword,
        user_status,
        user_address,
        user_avatar,
        user_gender,
        user_role,
      });

      // Lưu người dùng mới vào cơ sở dữ liệu
      await newUser.save();

      // Trả về thông tin cần thiết của người dùng sau khi đăng ký
      return res.status(201).json({
        message: "Account created successfully",
        user: newUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default Register;
