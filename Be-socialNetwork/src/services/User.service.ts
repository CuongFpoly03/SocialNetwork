import {
  ConflictError,
  InternalServerError,
  ResourceNotFoundError,
} from "../cores/error.response";
import User from "../models/User.model";
import { validate } from "../schemas";
import { userGoogleSchema } from "../schemas/User.schema";

class UserService {
  /**
   * google user
   */
  static async createUserGoogle({
    user_name,
    user_email,
    user_avatar,
  }: { user_name: string; user_email: string; user_avatar: string } | any) {
    validate(userGoogleSchema, { user_name, user_email });
    const checkEmail = await User.findOne({
      user_email: user_email,
      user_auth_type: "google",
    });
    if (checkEmail) throw new ConflictError("this email already exists");
    const newUser = await User.create({
      user_name,
      user_email,
      user_avatar,
      user_auth_type: "google",
    });
    if (!newUser)
      throw new InternalServerError("server error, try again 5 minnutes");
    return newUser;
  }

  /**
    getAll
  */
  static async getAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const allUsers = await User.find({}).skip(skip).limit(limit).lean();
    const totalNumberUser = await User.countDocuments();
    if (!allUsers)
      throw new InternalServerError("server error, try again 5 minnutes");
    return { page, limit, totalNumberUser, allUsers };
  }

  static async getUserById({ id }: { id: string }) {
    const userById = await User.findById(id);
    if (!userById)
      throw new ResourceNotFoundError("this user does not exits !");
    return userById;
  }
}

export default UserService;
