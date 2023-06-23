import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

//  Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'admin',
    // },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
