"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Local_1 = __importDefault(require("../providers/Local"));
const User_model_1 = __importDefault(require("../models/User.model"));
class AuthenticateAndAuthorize {
    // Xác thực người dùng
    static Authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lấy token từ request header
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                const decoded = jsonwebtoken_1.default.verify(token, Local_1.default.config().jwt_Secret);
                const user = yield User_model_1.default.findById(decoded.id);
                if (!user) {
                    return res.status(401).json({ message: "Invalid token!" });
                }
                req.user = user;
                next();
            }
            catch (error) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
    // Phân quyền người dùng
    static authorize(requiredRole) {
        return (req, res, next) => {
            const user = req.user;
            if (!user) {
                return res.status(403).json({ message: 'Access denied' });
            }
            const rolesHierarchy = ['user', 'admin', "root"];
            const userRoleIndex = rolesHierarchy.indexOf(user.user_role);
            const requiredRoleIndex = rolesHierarchy.indexOf(requiredRole);
            if (userRoleIndex < requiredRoleIndex) {
                return res.status(403).json({ message: 'You do not have permission to access this resource' });
            }
            next();
        };
    }
}
exports.default = AuthenticateAndAuthorize;
