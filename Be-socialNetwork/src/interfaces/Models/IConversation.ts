import mongoose from "mongoose";

export interface IConversation {
  conversation_participants: string[];
  conversation_messages: mongoose.Types.ObjectId[];
  conversation_createAt?: Date;
  conversation_updateAt?: Date;
}
