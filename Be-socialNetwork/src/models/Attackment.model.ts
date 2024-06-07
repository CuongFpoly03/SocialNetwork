import { IAttackment } from './../interfaces/Models/IAttackment';
import mongoose, { Schema, Document } from "mongoose";

const COLLECTION_NAME = "Attackments";
const DOCUMENT_NAME = "Attackment";
export interface IAttackmentModel extends IAttackment, Document {}

const AttackmentSchema: Schema = new Schema(
  {
    attackment_message: { type: mongoose.Types.ObjectId, ref: "Message" },
    attackment_file: { type: String, required: true },
    attackment_creaeAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Attackment = mongoose.model<IAttackmentModel>(DOCUMENT_NAME, AttackmentSchema);

export default Attackment;
