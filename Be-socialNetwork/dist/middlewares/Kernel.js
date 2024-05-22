"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = __importDefault(require("./Http"));
const SecurityImproving_1 = __importDefault(require("./SecurityImproving"));
const Local_1 = __importDefault(require("../providers/Local"));
const Cors_1 = __importDefault(require("./Cors"));
const views_1 = __importDefault(require("./views"));
const static_1 = __importDefault(require("./static"));
class Kernel {
    static init(_express) {
        if (Local_1.default.config().isCorsEnabled) {
            _express = Cors_1.default.mount(_express);
        }
        _express = Http_1.default.mount(_express);
        _express = SecurityImproving_1.default.mount(_express);
        // _express = SecurityImproving.mount(_express, callback);
        _express = views_1.default.mount(_express);
        _express = static_1.default.mount(_express);
        return _express;
    }
}
exports.default = Kernel;
