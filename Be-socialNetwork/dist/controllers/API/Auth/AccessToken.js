"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Local_1 = __importDefault(require("../../../providers/Local"));
class AccessToken {
    static generateAccessToken(user) {
        const accesstoken = Local_1.default.config().jwtAccessKey;
        // console.log(accesstoken)
        if (!accesstoken) {
            throw new Error("No token provided");
        }
        return jsonwebtoken_1.default.sign({
            id: user.id,
            user_role: user.user_role
        }, accesstoken, {
            expiresIn: "15s"
        });
    }
}
exports.default = AccessToken;
