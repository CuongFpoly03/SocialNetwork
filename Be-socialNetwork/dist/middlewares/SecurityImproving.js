"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lusca_1 = __importDefault(require("lusca"));
const Local_1 = __importDefault(require("../providers/Local"));
class SecurityImproving {
    static mount(_express) {
        _express.set('trust proxy', 1);
        _express.use((req, res, next) => {
            res.locals.user = req.user;
            res.locals.app = Local_1.default.config();
            next();
        });
        _express.use((req, res, next) => {
            if (req.originalUrl.includes(`/${Local_1.default.config().apiPrefix}/`)) {
                next();
            }
            else {
                lusca_1.default.csrf()(req, res, next);
            }
        });
        _express.use(lusca_1.default.xframe('SAMEORIGIN'));
        _express.use(lusca_1.default.xssProtection(true));
        // _express.use((req, res, next) => callback);
        return _express;
    }
}
exports.default = SecurityImproving;
