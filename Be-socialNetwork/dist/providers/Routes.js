"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
const morgan_1 = __importDefault(require("morgan"));
const Local_1 = __importDefault(require("./Local"));
const Api_1 = __importDefault(require("../routes/Api/Api"));
const web_1 = __importDefault(require("../routes/Web/web"));
class Routes {
    static mountWeb(_express) {
        Log_1.default.showLogs("Routes => Mounting Web Routes...");
        _express.use((0, morgan_1.default)('short'));
        return _express.use('/', web_1.default);
    }
    static mountApi(_express) {
        Log_1.default.showLogs("Routes mounted");
        _express.use((0, morgan_1.default)("short"));
        return _express.use(`/${Local_1.default.config().apiPrefix}`, Api_1.default);
    }
}
exports.default = Routes;
