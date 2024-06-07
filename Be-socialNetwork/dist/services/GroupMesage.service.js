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
const util_1 = require("util");
const SocketIo_1 = __importDefault(require("../providers/SocketIo"));
const Cache_1 = __importDefault(require("../providers/Cache"));
const mongoose_1 = __importDefault(require("mongoose"));
class GroupMessageService {
    constructor() {
        this.redisClient = null;
        new Cache_1.default();
    }
    initializeRedisClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.redisClient) {
                this.redisClient = yield Cache_1.default.getClient();
            }
        });
    }
    sendMessageToGroup(groupMessage_sender, groupMessage_content, groupMessage_read_by, groupMessage_group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeRedisClient();
            if (!this.redisClient) {
                throw new Error("Redis client is not initialized");
            }
            const groupMessageGroupStrings = groupMessage_group.map((id) => id instanceof mongoose_1.default.Types.ObjectId ? id.toHexString() : id);
            const groupMessage = {
                groupMessage_sender,
                groupMessage_content,
                groupMessage_read_by,
                groupMessage_group: groupMessageGroupStrings,
                groupMessage_createAt: new Date(),
            };
            const messageId = `groupMessage:${Date.now()}`;
            const groupKey = `group:${groupMessageGroupStrings[0]}:messages`;
            try {
                const setAsync = (0, util_1.promisify)(this.redisClient.set).bind(this.redisClient);
                const rPushAsync = (0, util_1.promisify)(this.redisClient.rPush).bind(this.redisClient);
                yield setAsync(messageId, JSON.stringify(groupMessage));
                yield rPushAsync(groupKey, messageId);
                SocketIo_1.default.getIo()
                    .to(groupMessageGroupStrings[0])
                    .emit("newGroupMessage", groupMessage);
                return groupMessage;
            }
            catch (error) {
                console.error("Error in sendMessageToGroup:", error);
                throw error;
            }
        });
    }
    getGroupMessages(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeRedisClient();
            if (!this.redisClient) {
                throw new Error("Redis client is not initialized");
            }
            const groupKey = `group:${groupId}:messages`;
            try {
                const lRangeAsync = (0, util_1.promisify)(this.redisClient.lRange).bind(this.redisClient);
                const getAsync = (0, util_1.promisify)(this.redisClient.get).bind(this.redisClient);
                const messageIds = yield lRangeAsync(groupKey, 0, -1);
                const messages = yield Promise.all(messageIds.map((messageId) => __awaiter(this, void 0, void 0, function* () {
                    const message = yield getAsync(messageId);
                    return message ? JSON.parse(message) : null;
                })));
                return messages.filter((message) => message !== null);
            }
            catch (error) {
                console.error("Error in getGroupMessages:", error);
                throw error;
            }
        });
    }
}
exports.default = new GroupMessageService();
