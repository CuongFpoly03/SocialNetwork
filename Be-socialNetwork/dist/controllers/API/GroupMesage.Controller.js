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
const GroupMesage_service_1 = __importDefault(require("../../services/GroupMesage.service"));
class GroupMessageController {
    sendGroupMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const groupMessage = req.body;
                // console.log(req.body);
                if (!groupMessage.groupMessage_sender ||
                    !groupMessage.groupMessage_content ||
                    !groupMessage.groupMessage_read_by ||
                    !groupMessage.groupMessage_group ||
                    groupMessage.groupMessage_group.length === 0) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                const message = yield GroupMesage_service_1.default.sendMessageToGroup(groupMessage.groupMessage_sender, groupMessage.groupMessage_content, groupMessage.groupMessage_read_by, groupMessage.groupMessage_group);
                return new success_response_1.SuccessResponse({
                    message: "Message sent successfully",
                    metadata: message,
                }).send(res);
            }
            catch (error) {
                console.error("Error sending message to group:", error);
                return res.status(500).json({ message: "Error sending message to group", error });
            }
        });
    }
    getGroupMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId } = req.params;
                if (!groupId) {
                    return res.status(400).json({ message: "Missing groupId parameter" });
                }
                const messages = yield GroupMesage_service_1.default.getGroupMessages(groupId);
                if (!messages) {
                    return res.status(404).json({ message: "Group messages not found" });
                }
                return new success_response_1.SuccessResponse({
                    message: "Fetched group messages successfully",
                    metadata: messages,
                }).send(res);
            }
            catch (error) {
                console.error("Error retrieving group messages:", error);
                return res.status(500).json({ message: "Error retrieving group messages", error });
            }
        });
    }
}
exports.default = new GroupMessageController();
