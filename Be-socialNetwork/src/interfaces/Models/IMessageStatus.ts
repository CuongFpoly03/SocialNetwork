import mongoose from "mongoose";

export enum readStatus {
  sent = "sent",
  received = "received",
  read = "read",
  deleted = "deleted",
  error = "error",
}
export interface IMessageStatus {
  messageStatus_status: readStatus;
  messageStatus_user: mongoose.Types.ObjectId[];
  messageStatus_message: mongoose.Types.ObjectId[];
  messageStatus_createAt: Date | string;
}
