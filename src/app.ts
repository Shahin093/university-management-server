import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/modules/users/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

import usersRouter from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/users/', UserRoutes)
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
//   // Promise.reject(new Error('Unhandled Promise Rejection.'))
//   //   res.send('Working Successfully')
//   //   throw new ApiError(400, 'ore baba error')
//   // next('Ore babure koto boro error') // Error
// })

// global error handler
app.use(globalErrorHandler)

// application Routes
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})


export default app
