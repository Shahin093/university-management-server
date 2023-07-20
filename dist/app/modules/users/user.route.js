"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const zodValidateRequest_1 = __importDefault(require("./middleware/zodValidateRequest"));
const user_zodValidation_1 = require("./user.zodValidation");
const router = express_1.default.Router();
router.post('/create-student', (0, zodValidateRequest_1.default)(user_zodValidation_1.UserZodValidation.createUserZodSchema), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, zodValidateRequest_1.default)(user_zodValidation_1.UserZodValidation.createFacultyZodSchema), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, zodValidateRequest_1.default)(user_zodValidation_1.UserZodValidation.createAdminZodSchema), user_controller_1.UserController.createAdmin);
exports.UserRoutes = router;
