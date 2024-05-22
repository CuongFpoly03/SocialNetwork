"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const Local_1 = __importDefault(require("../providers/Local"));
class Http {
    static mount(_express) {
        _express.use((0, cors_1.default)());
        _express.use((0, connect_flash_1.default)());
        _express.use((0, helmet_1.default)());
        _express.use((0, compression_1.default)());
        _express.use((0, express_session_1.default)({
            resave: false,
            secret: Local_1.default.config().secretKey,
            saveUninitialized: false,
            cookie: { secure: false },
            // store : new (MongoDBStore as any)({
            //     uri: process.env.MONGOOSE_URL,
            //     collection: 'sessions', 
            // })
        }));
        return _express;
    }
}
exports.default = Http;
