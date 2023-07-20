"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const academicFaculty_zodValidation_1 = require("./academicFaculty.zodValidation");
const router = express_1.default.Router();
router.post('/create-faculty', (0, zodValidateRequest_1.default)(academicFaculty_zodValidation_1.AcademicFacultyZodValidation.createFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.get('/:id', academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.patch('/:id', (0, zodValidateRequest_1.default)(academicFaculty_zodValidation_1.AcademicFacultyZodValidation.updateFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllFaculty);
exports.AcademicFacultyRoutes = router;
