/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
//  Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, UserModel>(
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.isUserExits = async function (
//   id: string
// ): Promise<Partial<IUser> | null | undefined> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );
//   return user;
// };

// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savePassword: string
// ): Promise<boolean> {
//   const isMatched = await bcrypt.compare(givenPassword, savePassword);
//   return isMatched;
// };

userSchema.statics.isUserExist = async function (
  id: string
): Promise<IUser | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
