import express from 'express';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { AcademicDepartmentZodValidation } from './academicDepartment.zodValidation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  zodValidateRequest(
    AcademicDepartmentZodValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  zodValidateRequest(
    AcademicDepartmentZodValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
