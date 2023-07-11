import express from 'express';
import { AdminController } from './admin.controller';
import { AdminZodValidation } from './admin.zodValidation';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);

router.get('/', AdminController.getAllAdmins);

router.patch(
  '/:id',
  zodValidateRequest(AdminZodValidation.updateAdmin),
  AdminController.updateAdmin
);

router.delete('/:id', AdminController.deleteAdmin);

export const AdminRoutes = router;
