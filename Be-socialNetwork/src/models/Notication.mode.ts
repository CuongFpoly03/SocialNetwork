import mongoose, { Document, Schema } from "mongoose";
import { INotication, readStatus } from "../interfaces/Models/INotication";

const COLLECTION_NAME = "Notications";
const DOCUMENT_NAME = "Notication";
interface INotications extends INotication, Document {}

const NoticationSchema: Schema = new Schema(
  {
    notication_message: {type: mongoose.Types.ObjectId, ref: "Message"},
    notication_notication_type: {type: mongoose.Types.ObjectId, ref: "NoticationType"},
    notication_user: {type: mongoose.Types.ObjectId, ref: "User"},
    notication_read_status: {type: String, enum: readStatus, default: readStatus.unread},
    notication_createAt: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Notication = mongoose.model<INotications>(
  DOCUMENT_NAME,
  NoticationSchema
);

export default Notication;
