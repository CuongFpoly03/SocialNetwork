import {
  IMessageStatus,
  readStatus,
} from "./../interfaces/Models/IMessageStatus";
import mongoose, { Schema, Document } from "mongoose";

const COLLECTION_NAME = "MessageStatus";
const DOCUMENT_NAME = "MessageStatus";
export interface IMessageStatusModel extends IMessageStatus, Document {}

const MessageStatusSchema: Schema = new Schema(
  {
    messageStatus_message: { type: mongoose.Types.ObjectId, ref: "Message" },
    messageStatus_user: { type: mongoose.Types.ObjectId, ref: "User" },
    messageStatus_status: {
      type: String,
      enum: readStatus,
      default: readStatus.sent,
      required: true,
    },
    mesageStatus_creaeAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const MessageStatus = mongoose.model<IMessageStatusModel>(
  DOCUMENT_NAME,
  MessageStatusSchema
);

export default MessageStatus;
