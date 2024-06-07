import mongoose, { Document, Schema } from "mongoose";
import { IMessage, readStatus } from "../interfaces/Models/IMessage";
const COLLECTION_NAME = "Messages";
const DOCUMENT_NAME = "Message";
interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema(
  {
    message_content: { type: String, required: true },
    message_sender: { type: String, required: true },
    message_receiver: { type: String, required: true },
    message_read_status: { type: String, enum: readStatus, default: readStatus.unread},
    message_conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Message = mongoose.model<IMessageModel>(DOCUMENT_NAME, MessageSchema);

export default Message;
