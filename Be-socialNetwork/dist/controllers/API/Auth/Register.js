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
const schemas_1 = require("../../../schemas");
const User_schema_1 = __importDefault(require("../../../schemas/User.schema"));
class Register {
    static Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lấy thông tin người dùng từ request
                const { user_name, user_email, user_phone_number, user_password, user_status, user_address, user_avatar, user_gender, user_role, } = req.body;
                (0, schemas_1.validate)(User_schema_1.default, { user_email, user_password, user_phone_number, user_address, user_name });
                // Kiểm tra xem email đã tồn tại chưa
                const existingUser = yield User_model_1.default.findOne({ user_email });
                if (existingUser) {
                    return res.status(400).json({
                        error: "Account with that email already exists",
                    });
                }
                // Mã hóa mật khẩu
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(user_password, saltRounds);
                // Tạo người dùng mới
                const newUser = new User_model_1.default({
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
                yield newUser.save();
                // Trả về thông tin cần thiết của người dùng sau khi đăng ký
                return res.status(201).json({
                    message: "Account created successfully",
                    user: newUser,
                });
            }
            catch (error) {
                console.error('Error during registration:', error);
                return res.status(400).json({
                    error: error.message,
                });
            }
        });
    }
}
exports.default = Register;
