import mongoose from "mongoose"

export interface IGroupMessage {
    groupMessage_sender: string
    groupMessage_content: string
    groupMessage_read_by: string
    groupMessage_group: mongoose.Types.ObjectId[],
    groupMessage_createAt: Date | string
}