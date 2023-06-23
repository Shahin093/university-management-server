import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})
let server: Server
async function database() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(' Database is Connected Successfully')
    server = app.listen(config.port, () => {
      logger.info(`App Listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect database.`, error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
database()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is receive')
  if (server) {
    server.close()
  }
})
