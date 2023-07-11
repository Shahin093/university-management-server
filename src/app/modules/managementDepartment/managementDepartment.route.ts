import express from 'express';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { ManagementDepartmentZodValidation } from './managementDepartment.zodValidation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  zodValidateRequest(
    ManagementDepartmentZodValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/:id', ManagementDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  zodValidateRequest(
    ManagementDepartmentZodValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete('/:id', ManagementDepartmentController.deleteDepartment);

router.get('/', ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
