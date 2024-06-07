import mongoose from "mongoose";

export interface IAttackment {
  attackment_message:  mongoose.Types.ObjectId[];
  attackment_file: string;
  attackment_createAt: Date | string;
}
