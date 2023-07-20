"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../../config"));
const handleVilidationError_1 = __importDefault(require("../../../../errors/handleVilidationError"));
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../../../errors/handleCastError"));
// import { Error } from 'mongoose';
// const globalErrorHandler: ErrorRequestHandler = (
//   error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   config.env === 'development'
//     ? console.log(' GlobalErrorHandler ', error)
//     : errorconsole.log('GlobalErrorHandler ', error);
//   let statusCode = 500;
//   let message = 'Something went wrong!';
//   let errorMassages: IGenericErrorMessage[] = [];
//   if (error?.name === 'ValidationError') {
//     const simplifiedError = handleValidationError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMassages = simplifiedError.errorMassages;
//   } else if (error instanceof ZodError) {
//     const simplifiedError = handleZodError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMassages = simplifiedError.errorMassages;
//   } else if (error?.name === 'CastError') {
//     const simplifiedError = handleCastError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMassages = simplifiedError.errorMassages;
//   } else if (error instanceof ApiError) {
//     statusCode = error?.statusCode;
//     message = error?.message;
//     errorMassages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message,
//           },
//         ]
//       : [];
//   } else if (error instanceof Error) {
//     message = error?.message;
//     errorMassages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message,
//           },
//         ]
//       : [];
//   }
//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorMassages,
//     stack: config.env !== 'production' ? error?.stack : undefined,
//   });
// };
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
        : console.log(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleVilidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMassages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMassages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMassages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
// path:
// message:
