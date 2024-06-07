import mongoose, { Document, Schema } from 'mongoose';
import { IConversation } from '../interfaces/Models/IConversation';


const COLLECTION_NAME = "Conversations";
const DOCUMENT_NAME = "Conversation";
interface IConversationModel extends IConversation, Document {}

const ConversationSchema: Schema = new Schema({
    conversation_participants: { type: [String], required: true },
    conversation_createAt: { type: Date, default: Date.now },
    conversation_updateAt: { type: Date, default: Date.now },
    conversation_messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
});

// Thêm hook để cập nhật conversation_updateAt mỗi khi tài liệu được lưu
ConversationSchema.pre<IConversationModel>('save', function(next) {
    this.conversation_updateAt = new Date();
    next();
});

const Conversation = mongoose.model<IConversationModel>(DOCUMENT_NAME, ConversationSchema);

export default Conversation;
