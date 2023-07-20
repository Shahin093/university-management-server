"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const faculty_zodValidation_1 = require("./faculty.zodValidation");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.FacultyController.getSingleFaculty);
router.get('/', faculty_controller_1.FacultyController.getAllFaculties);
router.patch('/:id', (0, zodValidateRequest_1.default)(faculty_zodValidation_1.FacultyValidation.updateFacultyZodSchema), faculty_controller_1.FacultyController.updateFaculty);
router.delete('/:id', faculty_controller_1.FacultyController.deleteFaculty);
exports.FacultyRoutes = router;
