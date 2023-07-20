"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const academicDepartment_zodValidation_1 = require("./academicDepartment.zodValidation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create-department', (0, zodValidateRequest_1.default)(academicDepartment_zodValidation_1.AcademicDepartmentZodValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleDepartment);
router.patch('/:id', (0, zodValidateRequest_1.default)(academicDepartment_zodValidation_1.AcademicDepartmentZodValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.updateDepartment);
router.delete('/:id', academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
