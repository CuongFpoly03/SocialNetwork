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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Local_1 = __importDefault(require("../../../providers/Local"));
const AccessToken_1 = __importDefault(require("./AccessToken"));
const RefreshToken_1 = __importDefault(require("./RefreshToken"));
class refreshToken {
    static generateRefreshToken(user) {
        const refreshToken = Local_1.default.config().jwtRefreshKey;
        if (!refreshToken) {
            throw new Error("No token provided");
        }
        return jsonwebtoken_1.default.sign({
            id: user.id,
            user_role: user.user_role
        }, refreshToken, {
            expiresIn: "365d"
        });
    }
    static requestRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // refresh token from user
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: "No refresh token provided" });
            }
            jsonwebtoken_1.default.verify(refreshToken, Local_1.default.config().jwtRefreshKey, (err, user) => {
                if (err) {
                    return res.status(403).json({ error: "Invalid refresh token" });
                }
                const accessToken = AccessToken_1.default.generateAccessToken(user);
                const refreshToken = RefreshToken_1.default.generateRefreshToken(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: "strict",
                });
                // return access token
                return res.status(200).json({ message: "successfully !",
                    accessToken
                });
            });
        });
    }
}
exports.default = refreshToken;
