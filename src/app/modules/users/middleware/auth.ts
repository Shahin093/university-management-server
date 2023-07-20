import { NextFunction, Request, Response } from 'express';
import ApiError from '../../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../../helpers/jwtHelpers';
import config from '../../../../config';
import { Secret } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../../enums/user';

// interface MyRequest extends Request {
//   user: {
//     role: ENUM_USER_ROLE;
//     userId: string;
//   };
// }

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorize.');
      }

      // verify token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role , userId

      // role diye guard korar jnno :--
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;