import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/modules/users/middleware/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users route
// app.use('/api/v1/users/', UserRoutes);
// // academic semester route
// app.use('/api/v1/academicSemester', AcademicSemesterRoutes);
app.use('/api/v1/', routes);
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
//   // Promise.reject(new Error('Unhandled Promise Rejection.'))
//   //   res.send('Working Successfully')
//   //   throw new ApiError(400, 'ore baba error')
//   // next('Ore babure koto boro error') // Error
// })

// global error handler
app.use(globalErrorHandler);
export default app;
