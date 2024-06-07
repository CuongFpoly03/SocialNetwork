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
const Cache_1 = __importDefault(require("../providers/Cache"));
const SocketIo_1 = __importDefault(require("../providers/SocketIo"));
const Conversation_model_1 = __importDefault(require("../models/Conversation.model"));
const Mesage_model_1 = __importDefault(require("../models/Mesage.model"));
const util_1 = require("util");
class MessageService {
    constructor() {
        this.redisClient = null;
        new Cache_1.default(); // Initialize the Redis client
    }
    initializeRedisClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.redisClient) {
                this.redisClient = yield Cache_1.default.getClient();
            }
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeRedisClient();
            if (!this.redisClient) {
                throw new Error("Redis client is not initialized");
            }
            const { message_content, message_sender, message_receiver } = message;
            try {
                let conversation = yield Conversation_model_1.default.findOne({
                    conversation_participants: { $all: [message_sender, message_receiver] },
                });
                if (!conversation) {
                    conversation = yield Conversation_model_1.default.create({
                        conversation_participants: [message_sender, message_receiver],
                        messages: [],
                    });
                }
                const newMessage = new Mesage_model_1.default({
                    message_content,
                    message_sender,
                    message_receiver,
                    message_read_status: "unread",
                    message_conversation: conversation._id,
                });
                conversation.conversation_messages.push(newMessage._id);
                yield Promise.all([conversation.save(), newMessage.save()]);
                const messageId = this.generateId();
                yield this.redisClient.set(`message:${messageId}`, JSON.stringify(newMessage));
                yield this.redisClient.lPush(`conversation:${conversation._id}:messages`, messageId);
                const receiverSocketId = SocketIo_1.default.getReaceiverSocketId(message_receiver);
                if (receiverSocketId) {
                    SocketIo_1.default.getIo().to(receiverSocketId).emit("newMessage", newMessage);
                }
            }
            catch (error) {
                console.error("Error in sendMessage:", error);
                throw error;
            }
        });
    }
    getMessages(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeRedisClient();
            if (!this.redisClient) {
                throw new Error("Redis client is not initialized");
            }
            try {
                console.log(`Fetching message IDs for conversation:${conversationId}:messages`);
                const lRangeAsync = (0, util_1.promisify)(this.redisClient.LRANGE).bind(this.redisClient);
                const messageIds = yield lRangeAsync(`conversation:${conversationId}:messages`, 0, -1);
                console.log(`Message IDs: ${messageIds}`);
                const getAsync = (0, util_1.promisify)(this.redisClient.GET).bind(this.redisClient);
                const messages = yield Promise.all(messageIds.map((messageId) => __awaiter(this, void 0, void 0, function* () {
                    const message = yield getAsync(`message:${messageId}`);
                    console.log(`Fetched message for ID ${messageId}: ${message}`);
                    return message ? JSON.parse(message) : null;
                })));
                const filteredMessages = messages.filter((message) => message !== null);
                console.log(`Filtered messages: ${JSON.stringify(filteredMessages)}`);
                return filteredMessages;
            }
            catch (error) {
                console.error("Error in getMessages:", error);
                throw error;
            }
        });
    }
    generateId() {
        return Date.now().toString();
    }
}
exports.default = new MessageService();
