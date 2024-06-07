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
const INotication_1 = require("../interfaces/Models/INotication");
const COLLECTION_NAME = "Notications";
const DOCUMENT_NAME = "Notication";
const NoticationSchema = new mongoose_1.Schema({
    notication_message: { type: mongoose_1.default.Types.ObjectId, ref: "Message" },
    notication_notication_type: { type: mongoose_1.default.Types.ObjectId, ref: "NoticationType" },
    notication_user: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    notication_read_status: { type: String, enum: INotication_1.readStatus, default: INotication_1.readStatus.unread },
    notication_createAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
});
const Notication = mongoose_1.default.model(DOCUMENT_NAME, NoticationSchema);
exports.default = Notication;
