import express from 'express';
import { UserController } from './user.controller';
import zodValidateRequest from './middleware/zodValidateRequest';
import { UserZodValidation } from './user.zodValidation';
const router = express.Router();

router.post(
  '/create-student',
  zodValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  zodValidateRequest(UserZodValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  zodValidateRequest(UserZodValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
