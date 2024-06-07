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
class ChangePassword {
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email, oldPassword, newPassword } = req.body;
                // Tìm người dùng trong cơ sở dữ liệu
                const user = yield User_model_1.default.findOne({ user_email });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                // Kiểm tra mật khẩu cũ
                const isMatch = yield bcrypt_1.default.compare(oldPassword, user.user_password);
                if (!isMatch) {
                    return res.status(401).json({ error: "Incorrect old password" });
                }
                // Mã hóa mật khẩu mới
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                // Cập nhật mật khẩu mới trong cơ sở dữ liệu
                user.user_password = hashedPassword;
                yield user.save();
                return res.status(200).json({ message: "Password updated successfully" });
            }
            catch (error) {
                return res.status(400).json({
                    error: `Error changing password: ${error.message}`,
                });
            }
        });
    }
}
exports.default = ChangePassword;
