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
const User_model_1 = __importDefault(require("../../../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Email_1 = __importDefault(require("../../../helpers/Email"));
class ForgotPassword {
    static ForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPassword = req.body.newPassword;
                yield Email_1.default.sendNewPasswordEmails(req.body.user_email, newPassword);
                return res.status(200).json({ message: "New password sent to email" });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    static resetPasswordRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email } = req.body;
                const user = yield User_model_1.default.findOne({ user_email: user_email });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                const newPassword = ForgotPassword.generateRandomPassword(6);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                user.user_password = hashedPassword;
                yield user.save();
                req.body.newPassword = newPassword;
                next();
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    static generateRandomPassword(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return newPassword;
    }
}
exports.default = ForgotPassword;
