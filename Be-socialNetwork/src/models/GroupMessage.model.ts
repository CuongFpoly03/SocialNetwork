import mongoose, { Schema, Document } from "mongoose";

const COLLECTION_NAME = "GroupMesages";
const DOCUMENT_NAME = "GroupMesage";
export interface IGroupMessage extends Document {
  groupMessage_sender: string;
  groupMessage_content: string;
  groupMessage_read_by: string;
  groupMessage_group: string[];
  groupMessage_createAt: Date | string;
}

const GroupMessageSchema: Schema = new Schema(
  {
    groupMessage_sender: { type: String, required: true },
    groupMessage_content: { type: String, required: true },
    groupMessage_read_by: { type: String, required: true },
    groupMessage_group: { type: mongoose.Types.ObjectId, ref: 'Group', required: true  },
    groupMessage_createAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const GroupMessage = mongoose.model<IGroupMessage>(
  DOCUMENT_NAME,
  GroupMessageSchema
);
export default GroupMessage;
