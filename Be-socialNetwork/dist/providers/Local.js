"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
class Locals {
    static config() {
        dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
        const port = process.env.PORT || 4000;
        const mongo_url = process.env.MONGO_URL;
        const url = process.env.URL;
        const apiPrefix = process.env.API_PREFIX;
        const appUrl = process.env.APP_URL;
        const secretKey = process.env.SECRET_KEY;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const jwtAccessKey = process.env.JWT_ACCESS_KEY;
        const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
        const jwt_Secret = process.env.JWT_SECRET;
        //LOGIN GOOGLE
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clietSecret = process.env.GOOGLE_CLIENT_SECRET;
        const callbackUrl = process.env.CALL_BACK_URL;
        //redis
        const password = process.env.REDIS_PASSWORD;
        return {
            password,
            clientId,
            clietSecret,
            callbackUrl,
            port,
            mongo_url,
            url,
            apiPrefix,
            appUrl,
            secretKey,
            emailUser,
            emailPass,
            jwtAccessKey,
            jwtRefreshKey,
            jwt_Secret,
        };
    }
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
