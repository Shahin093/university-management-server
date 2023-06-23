import express from 'express';
import { StudentController } from './student.controller';
import zodValidateRequest from '../users/middleware/zodValidateRequest';
import { StudentZodValidation } from './student.zodValidation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudents);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  zodValidateRequest(StudentZodValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
