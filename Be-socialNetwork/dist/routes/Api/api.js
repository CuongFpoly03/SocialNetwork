"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_1 = __importDefault(require("../../controllers/API/Auth/Login"));
const Register_1 = __importDefault(require("../../controllers/API/Auth/Register"));
const ForgotPw_1 = __importDefault(require("../../controllers/API/Auth/ForgotPw"));
const ChangePw_1 = __importDefault(require("../../controllers/API/Auth/ChangePw"));
const Logout_1 = __importDefault(require("../../controllers/API/Auth/Logout"));
const RefreshToken_1 = __importDefault(require("../../controllers/API/Auth/RefreshToken"));
const User_controller_1 = __importDefault(require("../../controllers/API/User.controller"));
const utils_1 = require("../../utils");
const Message_controller_1 = __importDefault(require("../../controllers/API/Message.controller"));
const GroupMesage_Controller_1 = __importDefault(require("../../controllers/API/GroupMesage.Controller"));
const Group_controller_1 = __importDefault(require("../../controllers/API/Group.controller"));
const router = (0, express_1.Router)();
// -------------------------ROUTER----------------------------
router.post("/auth/login", Login_1.default.Login);
router.post("/auth/register", Register_1.default.Register);
router.post("/auth/forgotfw", ForgotPw_1.default.resetPasswordRequest, ForgotPw_1.default.ForgotPassword);
router.post('/auth/changepw', ChangePw_1.default.changePassword);
router.post('/auth/logout', Logout_1.default.logout);
router.post('/auth/refreshtoken', RefreshToken_1.default.requestRefreshToken);
router.post("/auth/google", (0, utils_1.asyncHandler)(User_controller_1.default.creatUserGoogle));
//USER
router.post('/users', User_controller_1.default.getAll);
router.get('/users/:id', User_controller_1.default.getOneUser);
//Message
router.post("/messages", (0, utils_1.asyncHandler)(Message_controller_1.default.sendMessages));
router.get("/messages/:conversationId", (0, utils_1.asyncHandler)(Message_controller_1.default.getMessages));
//GroupMessage
router.post('/groupmessages', (0, utils_1.asyncHandler)(GroupMesage_Controller_1.default.sendGroupMessage));
router.get('/groupmessages/:groupId', (0, utils_1.asyncHandler)(GroupMesage_Controller_1.default.getGroupMessages));
//Group
router.post("/groups", (0, utils_1.asyncHandler)(Group_controller_1.default.createGroup));
router.post("/groups/members", (0, utils_1.asyncHandler)(Group_controller_1.default.addMember));
exports.default = router;
