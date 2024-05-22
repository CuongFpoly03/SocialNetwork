"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./providers/Database"));
const Express_1 = __importDefault(require("./providers/Express"));
class index {
    loadDatabase() {
        Database_1.default.init();
    }
    loadServer() {
        Express_1.default.init();
    }
}
(new index).loadServer();
(new index).loadDatabase();
