"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_zodValidation_1 = require("./admin.zodValidation");
const zodValidateRequest_1 = __importDefault(require("../users/middleware/zodValidateRequest"));
const router = express_1.default.Router();
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
router.get('/', admin_controller_1.AdminController.getAllAdmins);
router.patch('/:id', (0, zodValidateRequest_1.default)(admin_zodValidation_1.AdminZodValidation.updateAdmin), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoutes = router;
