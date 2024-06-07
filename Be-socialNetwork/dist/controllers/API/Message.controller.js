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
const Message_service_1 = __importDefault(require("../../services/Message.service"));
class MessageController {
    // Phương thức gửi tin nhắn
    static sendMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.body;
            yield Message_service_1.default.sendMessage(message);
            return new success_response_1.SuccessResponse({
                message: "Send message successfully",
                metadata: message,
            }).send(res);
        });
    }
    // Phương thức lấy tin nhắn
    static getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId } = req.params;
                console.log(`Fetching messages for conversationId: ${conversationId}`); // Logging để kiểm tra giá trị conversationId
                const messages = yield Message_service_1.default.getMessages(conversationId);
                console.log(`Fetched messages: ${JSON.stringify(messages)}`); // Logging để kiểm tra giá trị messages
                return new success_response_1.SuccessResponse({
                    message: "Get message successfully",
                    metadata: messages,
                }).send(res);
            }
            catch (error) {
                console.error("Error in getMessages controller:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.default = MessageController;
