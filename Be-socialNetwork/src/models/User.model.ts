import mongoose from "mongoose"
import { IUser, UserRole, UserStatus, UserTypeAuth } from "../interfaces/Models/IUser";

const COLLECTION_NAME = "User";
const DOCUMENT_NAME = "Users";

export interface IUserModel extends IUser, mongoose.Document { }

const Userchema = new mongoose.Schema<IUserModel>(
    {
        user_name: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
            required: true,
            unique: true,
        },
        user_phone_number: {
            type: String,
        },
        user_password: {
            type: String,
        },
        user_status: {
            type: String,
            enum: UserStatus,
            default: UserStatus.active,
            required: true
        },

        user_address: {
            type: String,
        },
        user_role: {
            type: String,
            enum: UserRole,
            default: UserRole.user,
            required: true
        },
        user_avatar: {
            type: String,
            default: "",
            required: true
        },
        user_gender: {
            type: String,
            default: "",
        },
        user_auth_type: {
            type: String,
            enum: UserTypeAuth,
            default: UserTypeAuth.local,
            required: true
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const User = mongoose.model<IUserModel>(DOCUMENT_NAME, Userchema);
export default User
