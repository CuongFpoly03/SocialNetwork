import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
import { validate } from "../../../schemas";
import { LoginSchema } from "../../../schemas/User.schema";
import UserService from "./CheckPermission";
class Login {
  public static async Login(req: any, res: any): Promise<any> {
    try {
      const { user_email, user_password } = req.body;
      validate(LoginSchema, { user_email, user_password });
      const user: any = await User.findOne({ user_email: user_email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const comparePW = await bcrypt.compare(user_password, user.user_password);
      if (!comparePW) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
       // Kiểm tra trạng thái người dùng
       if (user.user_status !== "active") {
        return res.status(403).json({ message: "Account is not active" });
      }

      //kiểm tra quyền nguời dùng
      if (!UserService.hasPermission(user, "user")) {
        return res
          .status(403)  
          .json({
            message: "You do not have permission to access this resource",
          });
      }
      const accessToken = AccessToken.generateAccessToken(user);
      const refreshToken = RefreshToken.generateRefreshToken(user);

      //gửi cookie tới new refreshtoken
      res.cookie("refreshToken", refreshToken, {
        //, cookie này sẽ không thể truy cập được qua JavaScript trên phía khách hàng (client-side).
        httpOnly: true,
        //huộc tính này xác định rằng cookie chỉ nên được gửi qua các kết nối HTTPS an toàn. Khi được đặt thành true, cookie sẽ chỉ được gửi nếu kết nối là HTTPS. Trong đoạn mã này, secure được đặt thành false, nghĩa là cookie sẽ được gửi qua cả HTTP và HTTPS
        secure: false,
        //path: Thuộc tính này xác định đường dẫn trong ứng dụng mà cookie có hiệu lực. Đặt thành '/' có nghĩa là cookie sẽ có hiệu lực trên toàn bộ trang web.
        path: "/",
        // Thuộc tính này ngăn chặn cookie được gửi cùng với các yêu cầu được khởi tạo từ các trang web khác nhau
        sammSite: "strict",
      });
      return res.status(200).json({
        message: "Login successfully",
        user,
        accessToken,
      });
    } catch (error: any) {
      console.error("Error during registration:", error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default Login;
