import { Router, Request, Response } from 'express';
import LoginController from '../../controllers/API/Auth/Login'
import RegisterController from '../../controllers/API/Auth/Register'
import ForgotPwController from '../../controllers/API/Auth/ForgotPw'
import ChangePwController from '../../controllers/API/Auth/ChangePw'
import LogoutController from '../../controllers/API/Auth/Logout'
import RefreshTokenController from '../../controllers/API/Auth/RefreshToken'
import UserController from "../../controllers/API/User.controller"
import { asyncHandler } from '../../utils';
import MessageController from '../../controllers/API/Message.controller';
import GroupMessageController from '../../controllers/API/GroupMesage.Controller';
import GroupController from '../../controllers/API/Group.controller';
const router = Router();

// -------------------------ROUTER----------------------------
router.post("/auth/login", LoginController.Login);
router.post("/auth/register", RegisterController.Register);
router.post("/auth/forgotfw",ForgotPwController.resetPasswordRequest, ForgotPwController.ForgotPassword, );
router.post('/auth/changepw', ChangePwController.changePassword);
router.post('/auth/logout', LogoutController.logout);
router.post('/auth/refreshtoken', RefreshTokenController.requestRefreshToken);
router.post("/auth/google", asyncHandler(UserController.creatUserGoogle))
//USER
router.post('/users',UserController.getAll);
router.get('/users/:id',UserController.getOneUser);
//Message
router.post("/messages",asyncHandler(MessageController.sendMessages));
router.get("/messages/:conversationId",asyncHandler(MessageController.getMessages));
//GroupMessage
router.post('/groupmessages', asyncHandler(GroupMessageController.sendGroupMessage));
router.get('/groupmessages/:groupId', asyncHandler(GroupMessageController.getGroupMessages));
//Group
router.post("/groups", asyncHandler(GroupController.createGroup));
router.post("/groups/members", asyncHandler(GroupController.addMember));

export default router;