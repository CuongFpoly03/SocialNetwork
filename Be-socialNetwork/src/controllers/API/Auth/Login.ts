import bcrypt from "bcrypt";
import User from "../../../models/User.model";
import AccessToken from "./AccessToken";
class Login {
  public static async Login(req: any, res: any): Promise<any> {
    const user_email = req.body.user_email;
    const password = req.body.user_password;
    const user: any = await User.findOne({ user_email: user_email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const comparePW = await bcrypt.compare(password, user.user_password);
    if (!comparePW) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = AccessToken.generateAccessToken(user);
    return res.status(200).json({
      message: "Login successfully",
      user,
      accessToken,
    });
  }
}

export default Login;
