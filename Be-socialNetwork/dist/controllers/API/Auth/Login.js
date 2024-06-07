"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../../../models/User.model"));
const AccessToken_1 = __importDefault(require("./AccessToken"));
const RefreshToken_1 = __importDefault(require("./RefreshToken"));
const schemas_1 = require("../../../schemas");
const User_schema_1 = require("../../../schemas/User.schema");
const CheckPermission_1 = __importDefault(require("./CheckPermission"));
class Login {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email, user_password } = req.body;
                (0, schemas_1.validate)(User_schema_1.LoginSchema, { user_email, user_password });
                const user = yield User_model_1.default.findOne({ user_email: user_email });
                if (!user) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
                const comparePW = yield bcrypt_1.default.compare(user_password, user.user_password);
                if (!comparePW) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
                // Kiểm tra trạng thái người dùng
                if (user.user_status !== "active") {
                    return res.status(403).json({ message: "Account is not active" });
                }
                //kiểm tra quyền nguời dùng
                if (!CheckPermission_1.default.hasPermission(user, "user")) {
                    return res
                        .status(403)
                        .json({
                        message: "You do not have permission to access this resource",
                    });
                }
                const accessToken = AccessToken_1.default.generateAccessToken(user);
                const refreshToken = RefreshToken_1.default.generateRefreshToken(user);
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
            }
            catch (error) {
                console.error("Error during registration:", error);
                return res.status(400).json({
                    error: error.message,
                });
            }
        });
    }
}
exports.default = Login;
