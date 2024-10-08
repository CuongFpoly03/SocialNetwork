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
const success_response_1 = require("../../cores/success.response");
const User_service_1 = __importDefault(require("../../services/User.service"));
class UserController {
    static creatUserGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new success_response_1.SuccessResponse({
                message: 'create user successfully',
                metadata: yield User_service_1.default.createUserGoogle(req.body)
            }).send(res);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new success_response_1.SuccessResponse({
                message: 'get all user successfully',
                metadata: yield User_service_1.default.getAll(req.query)
            }).send(res);
        });
    }
    static getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new success_response_1.SuccessResponse({
                message: "get One User successfully !",
                metadata: yield User_service_1.default.getUserById({ id: req.params.id })
            }).send(res);
        });
    }
}
exports.default = UserController;
