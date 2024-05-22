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
        return { port, mongo_url, url, apiPrefix, appUrl, secretKey };
    }
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
