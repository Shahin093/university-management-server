import express from 'express';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { AcademicSemesterZodValidation } from './academicSemester.zodValidation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  zodValidateRequest(
    AcademicSemesterZodValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.createSemester
);

router.patch(
  '/:id',
  zodValidateRequest(
    AcademicSemesterZodValidation.updateAcademicSemesterZodSchema
  ),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
