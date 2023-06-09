import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/modules/users/middleware/globalErrorHandler'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', userRouter)
// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Working Successfully')
//   // throw new ApiError(400, 'ore baba error')
//   // next('Ore babure koto boro error') // Error
// })

// global error handler
app.use(globalErrorHandler)
export default app
