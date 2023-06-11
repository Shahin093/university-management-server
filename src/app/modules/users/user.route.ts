import express from 'express';
import { UserController } from './user.controller';
import zodValidateRequest from './middleware/zodValidateRequest';
import { UserZodValidation } from './user.zodValidation';
const router = express.Router();

router.post(
  '/create-user',
  zodValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
