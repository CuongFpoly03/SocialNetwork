import mongoose, { Schema, Document } from "mongoose";

const COLLECTION_NAME = "Groups";
const DOCUMENT_NAME = "Group";
export interface IGroup extends Document {
  group_name: string;
  group_members: number;
  group_createAt: Date | string;
  group_updateAt: Date | string;
}

const GroupSchema: Schema = new Schema(
  {
    group_name: { type: String, required: true },
    group_members: { type: Number, required: true },
    group_createAt: { type: Date, default: Date.now },
    group_updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Group = mongoose.model<IGroup>(DOCUMENT_NAME, GroupSchema);

export default Group;
