"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class Views {
    static mount(_express) {
        _express.set('view engine', 'ejs');
        _express.set('view options', { pretty: true });
        _express.set('views', path_1.default.join(__dirname, '../../views'));
        return _express;
    }
}
exports.default = Views;
