import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental ID
  const id = await generatedUserId();
  // console.log(user)
  user.id = id;
  // default password
  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Falled to Create User!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
