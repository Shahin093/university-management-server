"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const academicSemester_zodValidation_1 = require("./academicSemester.zodValidation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post('/create-semester', (0, zodValidateRequest_1.default)(academicSemester_zodValidation_1.AcademicSemesterZodValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
router.patch('/:id', (0, zodValidateRequest_1.default)(academicSemester_zodValidation_1.AcademicSemesterZodValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
router.delete('/:id', academicSemester_controller_1.AcademicSemesterController.deleteSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
exports.AcademicSemesterRoutes = router;
