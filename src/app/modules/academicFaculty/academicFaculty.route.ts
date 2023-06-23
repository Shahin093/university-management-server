import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { AcademicFacultyZodValidation } from './academicFaculty.zodValidation';

const router = express.Router();

router.post(
  '/create-faculty',
  zodValidateRequest(AcademicFacultyZodValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  zodValidateRequest(AcademicFacultyZodValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
