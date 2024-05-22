"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Local_1 = __importDefault(require("./Local"));
class Database {
    static init() {
        mongoose_1.default.connect(Local_1.default.config().mongo_url)
            .then(() => console.log("MongoDB connected"))
            .catch((error) => {
            console.log(error);
            throw error;
        });
    }
}
exports.default = Database;
