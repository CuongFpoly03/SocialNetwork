"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Statics {
    static mount(_express) {
        _express.use(express_1.default.json());
        _express.use(express_1.default.urlencoded({ extended: true }));
        _express.use(express_1.default.static(path_1.default.join(__dirname, "public")));
        return _express;
    }
}
exports.default = Statics;
