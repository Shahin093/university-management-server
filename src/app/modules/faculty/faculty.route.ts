import express from 'express';
import { FacultyController } from './faculty.controller';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { FacultyValidation } from './faculty.zodValidation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.get('/', FacultyController.getAllFaculties);

router.patch(
  '/:id',
  zodValidateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
