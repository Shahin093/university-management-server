import express from 'express';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { AuthZodValidation } from './auth.zodValidation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  zodValidateRequest(AuthZodValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  zodValidateRequest(AuthZodValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

// router.post(
//   '/change-password',
//   validateRequest(AuthValidation.changePasswordZodSchema),

//   AuthController.changePassword
// );

export const AuthRoutes = router;
