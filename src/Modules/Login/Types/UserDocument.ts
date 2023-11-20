import * as mongoose from 'mongoose';

export interface IUserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userName: string;
  fullName: string;
  password: string;
  createdAt: number;
}
