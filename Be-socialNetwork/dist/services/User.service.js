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
const error_response_1 = require("../cores/error.response");
const User_model_1 = __importDefault(require("../models/User.model"));
const schemas_1 = require("../schemas");
const User_schema_1 = require("../schemas/User.schema");
class UserService {
    /**
     * google user
     */
    static createUserGoogle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_name, user_email, user_avatar, }) {
            (0, schemas_1.validate)(User_schema_1.userGoogleSchema, { user_name, user_email });
            const checkEmail = yield User_model_1.default.findOne({
                user_email: user_email,
                user_auth_type: "google",
            });
            if (checkEmail)
                throw new error_response_1.ConflictError("this email already exists");
            const newUser = yield User_model_1.default.create({
                user_name,
                user_email,
                user_avatar,
                user_auth_type: "google",
            });
            if (!newUser)
                throw new error_response_1.InternalServerError("server error, try again 5 minnutes");
            return newUser;
        });
    }
    /**
      getAll
    */
    static getAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit }) {
            const skip = (page - 1) * limit;
            const allUsers = yield User_model_1.default.find({}).skip(skip).limit(limit).lean();
            const totalNumberUser = yield User_model_1.default.countDocuments();
            if (!allUsers)
                throw new error_response_1.InternalServerError("server error, try again 5 minnutes");
            return { page, limit, totalNumberUser, allUsers };
        });
    }
    static getUserById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const userById = yield User_model_1.default.findById(id);
            if (!userById)
                throw new error_response_1.ResourceNotFoundError("this user does not exits !");
            return userById;
        });
    }
}
exports.default = UserService;
