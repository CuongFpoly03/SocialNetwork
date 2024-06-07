"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const COLLECTION_NAME = "Conversations";
const DOCUMENT_NAME = "Conversation";
const ConversationSchema = new mongoose_1.Schema({
    conversation_participants: { type: [String], required: true },
    conversation_createAt: { type: Date, default: Date.now },
    conversation_updateAt: { type: Date, default: Date.now },
    conversation_messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
});
// Thêm hook để cập nhật conversation_updateAt mỗi khi tài liệu được lưu
ConversationSchema.pre('save', function (next) {
    this.conversation_updateAt = new Date();
    next();
});
const Conversation = mongoose_1.default.model(DOCUMENT_NAME, ConversationSchema);
exports.default = Conversation;
