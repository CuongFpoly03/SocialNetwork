import mongoose from "mongoose";
export enum readStatus {
    read = "read",
    unread = "unread"
}
export interface INotication {
    notication_message: mongoose.Types.ObjectId[],
    notication_notication_type: mongoose.Types.ObjectId[],
    notication_user:mongoose.Types.ObjectId[],
    notication_read_status: readStatus,
    notication_createAt: Date | string
}