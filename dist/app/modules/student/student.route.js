"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const student_zodValidation_1 = require("./student.zodValidation");
const router = express_1.default.Router();
router.get('/:id', student_controller_1.StudentController.getSingleStudent);
router.get('/', student_controller_1.StudentController.getAllStudents);
router.delete('/:id', student_controller_1.StudentController.deleteStudent);
router.patch('/:id', (0, zodValidateRequest_1.default)(student_zodValidation_1.StudentZodValidation.updateStudentZodSchema), student_controller_1.StudentController.updateStudent);
exports.StudentRoutes = router;
