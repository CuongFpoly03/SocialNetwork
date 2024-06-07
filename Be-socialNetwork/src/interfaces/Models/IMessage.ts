import mongoose from "mongoose";


export enum readStatus {
    read = "read",
    unread = "unread"
}

export interface IMessage {
    message_content: string,
    message_sender: string,
    message_receiver: string,
    message_read_status: readStatus,
    message_conversation: mongoose.Types.ObjectId[];
    createAt: Date | string
}