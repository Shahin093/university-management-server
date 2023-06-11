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

export const AcademicSemesterRoutes = router;
