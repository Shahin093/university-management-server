import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

import usersRouter from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application Routes
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
