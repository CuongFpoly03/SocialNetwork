"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGoogleSchema = exports.LoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    user_name: joi_1.default.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": 'Trường "Tên" là bắt buộc',
    }),
    user_email: joi_1.default.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường "Email" là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    user_phone_number: joi_1.default
        .string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.pattern.base": "Giá trị phải là số điện thoại hợp lệ",
        "string.empty": "Trường không được để trống",
        "any.required": "Trường là bắt buộc",
    }),
    user_password: joi_1.default.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
    user_address: joi_1.default.string().required().messages({
        "string.empty": "Dia chi không được để trống",
        "any.required": 'Trường "Dia chi" là bắt buộc',
    }),
});
exports.LoginSchema = joi_1.default.object({
    user_email: joi_1.default.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường "Email" là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    user_password: joi_1.default.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
});
exports.userGoogleSchema = joi_1.default.object({
    user_name: joi_1.default.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "trường này là bắt buộc"
    }),
    user_email: joi_1.default.string().required().email().messages({
        "string.empty": "Email không được để trống",
        "any.required": "trường này là bắt buộc",
        "string.email": "Email không hợp lệ "
    }),
});
exports.default = userSchema;
