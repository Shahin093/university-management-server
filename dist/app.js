"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/modules/users/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// users route
// app.use('/api/v1/users/', UserRoutes);
// // academic semester route
// app.use('/api/v1/academicSemester', AcademicSemesterRoutes);
app.use('/api/v1/', routes_1.default);
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
//   // Promise.reject(new Error('Unhandled Promise Rejection.'))
//   //   res.send('Working Successfully')
//   //   throw new ApiError(400, 'ore baba error')
//   // next('Ore babure koto boro error') // Error
// })
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMassages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
// global error handler
app.use(globalErrorHandler_1.default);
// const testIds = async (): Promise<void> => {
//   const testId = await generateFaculty();
//   console.log(testId);
// };
// testIds();
exports.default = app;
