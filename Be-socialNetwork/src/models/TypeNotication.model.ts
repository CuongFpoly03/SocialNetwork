import mongoose, { Document, Schema } from 'mongoose';
import { INoticationType } from '../interfaces/Models/INoticationType';


const COLLECTION_NAME = "TypeNotications";
const DOCUMENT_NAME = "TypeNotication";
interface ITypeNotications extends INoticationType, Document {}

const TypeNoticationSchema: Schema = new Schema({
    NoticationType_name: { type: String, required: true },
    NoticationType_description: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
});

const TypeNotication = mongoose.model<ITypeNotications>(DOCUMENT_NAME, TypeNoticationSchema);

export default TypeNotication;
