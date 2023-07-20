import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { AcademicFacultyZodValidation } from './academicFaculty.zodValidation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../users/middleware/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  zodValidateRequest(AcademicFacultyZodValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  zodValidateRequest(AcademicFacultyZodValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoutes = router;
