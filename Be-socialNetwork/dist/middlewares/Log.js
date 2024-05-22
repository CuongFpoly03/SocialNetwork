"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
class Log {
    constructor(log) {
        this.log = log;
    }
    addLogs(log) {
        this.log = log;
        return `Logs: ${this.log}\n`;
    }
    showLogs(log) {
        (0, express_1.default)().use((0, morgan_1.default)("short"));
        console.log(this.addLogs(log));
    }
}
exports.default = new Log();
